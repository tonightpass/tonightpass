import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import {
  Client,
  type Contact,
  type LibraryResponse,
  type SendEmailV3_1,
} from "node-mailjet";
import type { ClientParams } from "node-mailjet/declarations/client/Client";
import { MAILJET_MODULE_OPTIONS } from "../constants/mailjet.constants";
import type { MailjetModuleOptions } from "./interfaces";

@Injectable()
export class MailjetService {
  private readonly client: Client;

  constructor(
    @Inject(MAILJET_MODULE_OPTIONS)
    options: MailjetModuleOptions
  ) {
    const clientConfig: ClientParams = {
      apiKey: options.apiKey,
      apiSecret: options.apiSecret,
    };

    if (options.sandboxMode === true) {
      clientConfig.config = {
        version: "v3.1",
        host: "api.mailjet.com",
        output: "json",
      };
    }

    this.client = new Client(clientConfig);

    if (!this.client) {
      throw new Error("Mailjet client is not initialized");
    }
  }

  async findContact(id: string | number): Promise<Contact.Contact> {
    const queryData: Contact.GetContactQueryParams = {
      IsExcludedFromCampaigns: false,
    };

    const result: LibraryResponse<Contact.GetContactResponse> =
      await this.client
        .get("contact", { version: "v3" })
        .id(id.toString())
        .request({}, queryData);

    if (result.response.status !== 200 || result.body.Count === 0) {
      throw new Error(`Contact with id ${id} not found`);
    }

    return result.body.Data[0];
  }

  async addContact(contact: Contact.PostContactBody): Promise<Contact.Contact> {
    const result: LibraryResponse<Contact.PostContactResponse> =
      await this.client.post("contact", { version: "v3" }).request(contact);

    if (result.response.status !== 201 || result.body.Count === 0) {
      throw new Error("Contact not created");
    }

    return result.body.Data[0];
  }

  async subscribeContactToList(
    contactId: string | number,
    listId: string | number
  ): Promise<Contact.Contact> {
    const result: LibraryResponse<Contact.PostContactResponse> =
      await this.client
        .post("contact", { version: "v3" })
        .id(contactId.toString())
        .action("managecontactslists")
        .request({
          ContactsLists: [
            {
              Action: "addforce",
              ListID: listId,
            },
          ],
        });

    if (result.response.status !== 201 || result.body.Count === 0) {
      throw new Error("Contact not subscribed");
    }

    return result.body.Data[0];
  }

  async unsubscribeContactFromList(
    contactId: string | number,
    listId: string | number
  ): Promise<Contact.Contact> {
    const result: LibraryResponse<Contact.PostContactResponse> =
      await this.client
        .post("contact", { version: "v3" })
        .id(contactId.toString())
        .action("managecontactslists")
        .request({
          ContactsLists: [
            {
              Action: "unsub",
              ListID: listId,
            },
          ],
        });

    if (result.response.status !== 201 || result.body.Count === 0) {
      throw new Error("Contact not unsubscribed");
    }

    return result.body.Data[0];
  }

  async sendEmail<TVars>(
    messages: SendEmailV3_1.Body<undefined, TVars>
  ): Promise<SendEmailV3_1.ResponseMessage[]> {
    const result: LibraryResponse<SendEmailV3_1.Response> = await this.client
      .post("send", { version: "v3.1" })
      .request(messages);

    if (
      result.response.status !== HttpStatus.OK ||
      result.body.Messages.length === 0 ||
      result.body.Messages[0].Status !== "success"
    ) {
      throw new Error(
        `Email messages not sent: ${JSON.stringify(result.body.Messages?.[0] || result.body)}`
      );
    }

    return result.body.Messages;
  }
}
