export interface MailjetModuleOptions {
  /**
   *  public Mailjet API key
   */
  apiKey: string;

  /**
   *  private Mailjet API key
   */
  apiSecret: string;

  /**
   * When true, the API call will be run in Sandbox mode. This will disable the delivery of the message, but the API will still perform all necessary validations. You will still receive success or error messages related to the processing of the message. If the message is processed successfully, you will receive the standard response payload but without the Message ID and UUID.
   * Default value: false
   */
  sandboxMode?: boolean;
}
