import { HttpStatus } from "@nestjs/common";

import { MailjetMethodOptions, Retry } from "./retry.decorator";
import { MailjetErrorResponse } from "../types/mailjet-response";

export const RetryGet = <T extends (...args: never[]) => Promise<unknown>>(
  options?: MailjetMethodOptions,
) => {
  return Retry<T>({
    ...options,
    expectedStatus: HttpStatus.OK,
    shouldRetry: (error: MailjetErrorResponse): boolean =>
      error.StatusCode === HttpStatus.TOO_MANY_REQUESTS ||
      error.StatusCode >= HttpStatus.INTERNAL_SERVER_ERROR,
  });
};
