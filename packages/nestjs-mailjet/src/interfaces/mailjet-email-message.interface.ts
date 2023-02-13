export type EmailMessageContact = {
  /**
   * The email address.
   */
  email: string;

  /**
   * The name of the contact. Will be displayed in their mailbox.
   */
  name?: string;
};

export type EmailAttachment = {
  /**
   * The full name of the file (including the file extension).
   */
  filename: string;

  /**
   * Defines the type of content being sent out using a MIME type.
   * See the official MIME type {@link https://www.iana.org/assignments/media-types/media-types.xhtml} list for additional information.
   */
  contentType: string;

  /**
   * Base64 encoded content of the attached file.
   */
  base46Content: string;
};

export interface MailjetEmailMessage<Payload> {
  /**
   * Must be a valid, activated and registered sender for this account.
   * JSON object with 2 properties Email and Name
   * Sample : {"Email": "pilot@mailjet.com", "Name":"your pilot speaking"}
   */
  from?: EmailMessageContact;

  /**
   * Collection of recipients, each presented as a JSON object
   * Sample: [{"Email":"passenger@mailjet.com","Name":"passenger"}]
   * If a recipient is specified twice (in the to, cc, or bcc), it is counted only once.
   * Can be a contact list as well (magic list) - address@lists.mailjet.com. See the Address contactslist property.
   * MAX RECIPIENTS: 50
   */
  to: EmailMessageContact[];

  /**
   * Collection of carbon copy recipients, each presented as a JSON object
   * Sample: [{"Email":"passenger@mailjet.com","Name":"passenger"}]
   * If one recipient is specified twice, we count it as one (including to, cc, bcc)
   * MAX RECIPIENTS: 50
   */
  cc?: EmailMessageContact[];

  /**
   * Collection of blind carbon copy recipients, each presented as a JSON object
   * Sample: [{"Email":"passenger@mailjet.com","Name":"passenger"}]
   * If one recipient is specified twice, we count it as one (including to, cc, bcc)
   * MAX RECIPIENTS: 50
   */
  bcc?: EmailMessageContact[];

  /**
   * Variables used for personalization and/or template language in the message.
   */
  variables?: Payload;

  /**
   * Activates the template language processing.
   * By default the template language processing is deactivated.
   * Use <code>True</code>True to activate.
   */
  templateLanguage?: boolean;

  /**
   * Maximum length is 255 chars
   * MAX SUBJECTS: 1
   */
  subject?: string;

  /**
   * The Template ID to be used as email content. Overrides the HTML/Text parts if any.
   * MANDATORY IF NO HTML/TEXT - MAX TEMPLATEID: 1
   */
  templateID?: number;

  /**
   * Provides the Text part of the message
   * Mandatory if the HTML or TemplateID parameter is not specified
   * MANDATORY IF NO HTML - MAX PARTS: 1
   */
  textPart?: string;

  /**
   * Provides the HTML part of the message
   * Mandatory if the Text or TemplateID parameter is not specified
   * MANDATORY IF NO TEXT - MAX PARTS: 1
   */
  htmlPart?: string;

  /**
   * Attach files automatically to this Email.
   * Size of all attachments, including inline may not exceed 15 MB total.
   * Sample: [{"ContentType": "MIME TYPE", "Filename": "FILENAME.EXT", "Base64Content":"BASE64 ENCODED CONTENT"}]
   */
  attachments?: EmailAttachment[];
}
