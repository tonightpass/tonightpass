import { HttpException, Inject, Injectable, Logger } from "@nestjs/common";
import mailjet, { ConfigOptions, Email } from "node-mailjet";

import { MailjetContact } from "../interfaces/mailjet-contact.interface";
import { MailjetEmailMessage } from "../interfaces/mailjet-email-message.interface";
import { IMailjetModuleOptions } from "../interfaces/mailjet-module-options.interface";
import { MAILJET_MODULE_OPTIONS } from "./../constants/mailjet.constants";

@Injectable()
export class MailjetService {
  private readonly logger = new Logger(MailjetService.name);

  private readonly mailClient: Email.Client;

  constructor(
    @Inject(MAILJET_MODULE_OPTIONS)
    private readonly options: IMailjetModuleOptions
  ) {
    this.logger.debug(
      `${MailjetService.name}.options: ${
        this.options ? JSON.stringify(this.options) : null
      }`
    );

    this.mailClient = mailjet.connect(
      this.options.apiKey,
      this.options.apiSecret,
      {
        ...(!!this.options.sandboxMode && {
          perform_api_call: this.options.sandboxMode,
        }),
      }
    );

    if (!this.mailClient) {
      throw new Error("Failed to initialize Mailjet client.");
    }
  }

  public async findContact(id: string | number) {
    const options: ConfigOptions = {
      version: "v3",
    };

    try {
      const result = await this.mailClient
        .get("contact", options)
        .id(id)
        .request();
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.logger.error(err.message);
      throw new HttpException("api.error.mailjet", err.statusCode);
    }
  }

  public async addContact(contact: MailjetContact) {
    const options: ConfigOptions = {
      version: "v3",
    };

    try {
      const result = await this.mailClient
        .post("contact", options)
        .request(contact);
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.logger.error(err.message);
      throw new HttpException("api.error.mailjet", err.statusCode);
    }
  }

  public async subscribeContact(
    contactId: string | number,
    listId: string,
    action: "addforce" | "addnoforce" = "addforce"
  ) {
    const options: ConfigOptions = {
      version: "v3",
    };

    try {
      const result = await this.mailClient
        .post("contact", options)
        .id(contactId)
        .action("managecontactslists")
        .request({
          contactsLists: [
            {
              action,
              listId,
            },
          ],
        });
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.logger.error(err.message);
      throw new HttpException("api.error.mailjet", err.statusCode);
    }
  }

  public async sendMail<T>(messagesDetail: MailjetEmailMessage<T>[]) {
    const options: ConfigOptions = {
      version: "v3.1",
    };

    try {
      const result = await this.mailClient.post("send", options).request({
        messages: messagesDetail,
      });
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.logger.error(err.message);
      throw new HttpException("api.error.mailjet", err.statusCode);
    }
  }
}
