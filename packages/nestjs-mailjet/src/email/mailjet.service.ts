import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { Client, Contact, LibraryResponse, SendEmailV3_1 } from "node-mailjet";

import type { MailjetModuleOptions } from "./interfaces";
import { MAILJET_MODULE_OPTIONS } from "../constants/mailjet.constants";
import { RetryGet } from "../decorators/retry-get.decorator";
import { RetryPost } from "../decorators/retry-post.decorator";
import { RetryPut } from "../decorators/retry-put.decorator";
import { MailjetEmailError } from "../errors/mailjet-email.error";

/**
 * Service for interacting with the Mailjet API.
 * Provides methods for managing contacts, contact lists, and sending emails.
 *
 * @example
 * // Inject the service in your module
 * constructor(private readonly mailjetService: MailjetService) {}
 */
@Injectable()
export class MailjetService extends Client {
  private readonly logger = new Logger(MailjetService.name);

  constructor(
    @Inject(MAILJET_MODULE_OPTIONS)
    options: MailjetModuleOptions,
  ) {
    super({
      apiKey: options.apiKey,
      apiSecret: options.apiSecret,
      config: {
        version: "v3",
      },
      ...(!!options.sandboxMode && {
        perform_api_call: options.sandboxMode,
      }),
    });
  }

  /**
   * Retrieves a contact by their ID.
   *
   * @param id - The contact's ID (can be string or number)
   * @param queryParams - Optional query parameters for the request
   * @returns Promise resolving to the contact details
   * @throws Error if contact is not found or request fails
   *
   * @example
   * const contact = await mailjetService.findContact('123');
   * console.log(contact.Email);
   */
  @RetryGet({
    attempts: 5,
    delay: 500,
  })
  async findContact(id: string | number): Promise<Contact.Contact> {
    const queryData: Contact.GetContactQueryParams = {
      IsExcludedFromCampaigns: false,
    };

    const result: LibraryResponse<Contact.GetContactResponse> = await this.get(
      "contact",
    )
      .id(id.toString())
      .request({}, queryData);

    /* if (result.response.status !== 200 || result.body.Count === 0) {
      throw new Error(`Contact with id ${id} not found`);
    } */

    return result.body.Data[0];
  }

  /**
   * Finds a contact by their email address.
   *
   * @param email - The email address to search for
   * @returns Promise resolving to the contact if found, null otherwise
   * @throws Error if the request fails
   *
   * @example
   * const contact = await mailjetService.findContactByEmail('user@example.com');
   * if (contact) {
   *   console.log('Contact found:', contact.ID);
   * }
   */
  @RetryGet({
    attempts: 3,
    delay: 300,
  })
  async findContactByEmail(email: string): Promise<Contact.Contact | null> {
    const result: LibraryResponse<Contact.GetContactResponse> = await this.get(
      "contact",
    ).request({}, { Email: email });

    return result.body.Count > 0 ? result.body.Data[0] : null;
  }

  /**
   * Creates a new contact. If the contact already exists (checked by email),
   * updates the existing contact instead.
   *
   * @param contact - The contact details to create
   * @returns Promise resolving to the created or updated contact
   * @throws Error if contact creation fails
   *
   * @example
   * const newContact = await mailjetService.addContact({
   *   Email: 'user@example.com',
   *   Name: 'John Doe'
   * });
   */
  @RetryPost({
    attempts: 4,
    delay: 1000,
  })
  async addContact(contact: Contact.PostContactBody): Promise<Contact.Contact> {
    try {
      const existingContact = await this.findContactByEmail(contact.Email);
      if (existingContact) {
        return this.updateContact(existingContact.ID, contact);
      }
    } catch (error) {
      this.logger.debug(`Error checking existing contact: ${error.message}`);
    }

    const result: LibraryResponse<Contact.PostContactResponse> =
      await this.post("contact", { version: "v3" }).request(contact);

    if (
      result.response.status !== HttpStatus.CREATED ||
      result.body.Count === 0
    ) {
      throw new Error("Contact not created");
    }

    return result.body.Data[0];
  }

  /**
   * Updates an existing contact. Includes optimistic locking using LastUpdateAt.
   *
   * @param id - The ID of the contact to update
   * @param contact - The updated contact details
   * @returns Promise resolving to the updated contact
   * @throws Error if update fails or contact not found
   *
   * @example
   * const updatedContact = await mailjetService.updateContact('123', {
   *   Name: 'Jane Doe'
   * });
   */
  @RetryPut({
    attempts: 5,
    delay: 800,
  })
  async updateContact(
    id: string | number,
    contact: Contact.PutContactBody,
  ): Promise<Contact.Contact> {
    const currentContact = await this.findContact(id);

    const result: LibraryResponse<Contact.PutContactResponse> = await this.put(
      "contact",
      { version: "v3" },
    )
      .id(id.toString())
      .request({
        ...contact,
        LastUpdateAt: currentContact.LastUpdateAt,
      });

    if (result.response.status !== HttpStatus.OK || result.body.Count === 0) {
      throw new Error("Contact not updated");
    }

    return result.body.Data[0];
  }

  /**
   * Manages a contact's list subscription status.
   * Internal method used by subscribeContactToList and unsubscribeContactFromList.
   *
   * @param contactId - The ID of the contact
   * @param listId - The ID of the list
   * @param action - The action to perform ('addforce', 'addnoforce', 'remove' or 'unsub')
   * @returns Promise resolving to the updated contact
   * @throws Error if the operation fails
   *
   * @internal
   */
  @RetryPost({
    attempts: 4,
    delay: 1500,
  })
  protected async manageContactList(
    contactId: string | number,
    listId: string | number,
    action: "addforce" | "addnoforce" | "remove" | "unsub",
  ): Promise<Contact.Contact> {
    const result: LibraryResponse<Contact.PostContactResponse> =
      await this.post("contact", { version: "v3" })
        .id(contactId.toString())
        .action("managecontactslists")
        .request({
          ContactsLists: [
            {
              Action: action,
              ListID: listId,
            },
          ],
        });

    if (
      result.response.status !== HttpStatus.CREATED ||
      result.body.Count === 0
    ) {
      throw new Error(`Contact list operation failed: ${action}`);
    }

    return result.body.Data[0];
  }

  /**
   * Subscribes a contact to a specified list.
   * Uses 'addforce' action which adds the contact if not already in the list.
   *
   * @param contactId - The ID of the contact to subscribe
   * @param listId - The ID of the list to subscribe to
   * @returns Promise resolving to the updated contact
   * @throws Error if subscription fails
   *
   * @example
   * await mailjetService.subscribeContactToList('123', '456');
   */
  async subscribeContactToList(
    contactId: string | number,
    listId: string | number,
  ): Promise<Contact.Contact> {
    return this.manageContactList(contactId, listId, "addforce");
  }

  /**
   * Unsubscribes a contact from a specified list.
   * Uses 'unsub' action which marks the contact as unsubscribed but maintains history.
   *
   * @param contactId - The ID of the contact to unsubscribe
   * @param listId - The ID of the list to unsubscribe from
   * @returns Promise resolving to the updated contact
   * @throws Error if unsubscription fails
   *
   * @example
   * await mailjetService.unsubscribeContactFromList('123', '456');
   */
  async unsubscribeContactFromList(
    contactId: string | number,
    listId: string | number,
  ): Promise<Contact.Contact> {
    return this.manageContactList(contactId, listId, "unsub");
  }

  /**
   * Removes a contact from a specified list.
   * Uses 'remove' action which completely removes the contact from the list.
   * Unlike unsubscribe, this removes all history and data of the contact from the list.
   *
   * @param contactId - The ID of the contact to remove
   * @param listId - The ID of the list to remove from
   * @returns Promise resolving to the updated contact
   * @throws Error if removal fails
   *
   * @example
   * await mailjetService.removeContactFromList('123', '456');
   */
  async removeContactFromList(
    contactId: string | number,
    listId: string | number,
  ): Promise<Contact.Contact> {
    return this.manageContactList(contactId, listId, "remove");
  }

  /**
   * Sends one or more email messages using the Mailjet API v3.1.
   * Includes retry logic for handling rate limits and temporary failures.
   *
   * @param messages - The email message(s) to send
   * @returns Promise resolving to array of message responses
   * @throws MailjetEmailError if sending fails after all retries
   *
   * @example
   * const response = await mailjetService.sendEmail({
   *   Messages: [{
   *     From: { Email: "from@example.com" },
   *     To: [{ Email: "to@example.com" }],
   *     Subject: "Test Email",
   *     TextPart: "Hello World"
   *   }]
   * });
   */
  @RetryPost({
    attempts: 6,
    delay: 2000,
    expectedStatus: HttpStatus.CREATED,
    shouldRetry: (error) => {
      if (error.StatusCode === HttpStatus.TOO_MANY_REQUESTS) return true;
      if (error.StatusCode >= HttpStatus.INTERNAL_SERVER_ERROR) return true;
      if (error.ErrorCode === "mj-0015" || error.ErrorCode === "mj-0016")
        return true;
      return false;
    },
  })
  async sendEmail<TVars>(
    messages: SendEmailV3_1.Body<undefined, TVars>,
  ): Promise<SendEmailV3_1.ResponseMessage[]> {
    const result: LibraryResponse<SendEmailV3_1.Response> = await this.post(
      "send",
      { version: "v3.1" },
    ).request(messages);

    const failedMessages = result.body.Messages.filter(
      (msg) => msg.Status !== "success",
    );

    if (
      result.response.status !== HttpStatus.CREATED ||
      failedMessages.length > 0
    ) {
      const errors = failedMessages.map((msg) => msg.Errors || []).flat();
      throw new MailjetEmailError(
        result.response.status,
        errors,
        `Failed to send ${failedMessages.length} email message(s)`,
      );
    }

    return result.body.Messages;
  }
}
