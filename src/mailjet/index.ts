// References:
// https://github.com/mailjet/api-documentation/blob/master/guides/_send-api.md
// https://dev.mailjet.com/email/reference

type EmailMessageContact = {
  Email: string;
  Name?: string;
};

type Attachment = {
  Filename: string;
  ContentType: string;
  Base46Content: string;
};

export type MailjetEmailMessage<Payload> = {
  From?: EmailMessageContact;
  To: EmailMessageContact[];
  Cc?: EmailMessageContact[];
  Bcc?: EmailMessageContact[];
  Variables?: Payload;
  TemplateLanguage?: boolean;
  Subject?: string;
  TemplateID?: number;
  TextPart?: string;
  HTMLPart?: string;
  Attachments?: Attachment[];
};

export * from "./contact";
