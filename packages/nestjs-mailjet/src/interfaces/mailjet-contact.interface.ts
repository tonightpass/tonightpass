/**
 * Mailjet contact interface
 *
 * @Reference https://dev.mailjet.com/email/reference/contacts/contact/
 */
export interface MailjetContact {
  /**
   * Contact email address. Must be unique (not present already in the global contact list).
   */
  email: string;

  /**
   * User-selected name for this contact.
   */
  name?: string;

  /**
   * Indicates whether the contact is added to the exclusion list for campaigns or not. An excluded contact will not be receiving any marketing emails.
   */
  isExcludedFromCampaigns?: boolean;
}
