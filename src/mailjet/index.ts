// References:
// https://github.com/mailjet/api-documentation/blob/master/guides/_send-api.md
// https://dev.mailjet.com/email/reference

type EmailMessageContact = {
  email: string;
  name?: string;
};

type Attachment = {
  filename: string;
  contentType: string;
  base46Content: string;
};

export type MailjetEmailMessage<Payload> = {
  from?: EmailMessageContact;
  to: EmailMessageContact[];
  cc?: EmailMessageContact[];
  bcc?: EmailMessageContact[];
  variables?: Payload;
  templateLanguage?: boolean;
  subject?: string;
  templateID?: number;
  textPart?: string;
  htmlPart?: string;
  attachments?: Attachment[];
};

export * from "./contact";
