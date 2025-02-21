import { MailjetErrorResponse } from "./mailjet-response";

export interface RetryOptions<T = unknown> {
  attempts?: number;
  delay?: number;
  shouldRetry?: (error: MailjetErrorResponse) => boolean;
  expectedStatus?: number;
  validateResponse?: (result: T) => boolean;
}
