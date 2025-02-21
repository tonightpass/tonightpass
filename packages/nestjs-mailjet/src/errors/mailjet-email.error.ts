import { MailjetErrorResponse } from "../types/mailjet-response";

export class MailjetEmailError extends Error {
  constructor(
    public readonly status: number,
    public readonly errors: MailjetErrorResponse[],
    message: string,
  ) {
    super(message);
    this.name = "MailjetEmailError";
  }
}
