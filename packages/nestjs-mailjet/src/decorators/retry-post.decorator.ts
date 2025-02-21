import { HttpStatus } from "@nestjs/common";

import { Retry } from "./retry.decorator";
import { MailjetErrorResponse } from "../types/mailjet-response";
import { RetryOptions } from "../types/retry-options";

export const RetryPost = <T extends (...args: never[]) => Promise<unknown>>(
  options?: RetryOptions,
) => {
  return Retry<T>({
    ...options,
    expectedStatus: HttpStatus.CREATED,
    shouldRetry: (error: MailjetErrorResponse): boolean =>
      error.StatusCode === HttpStatus.TOO_MANY_REQUESTS ||
      error.StatusCode >= HttpStatus.INTERNAL_SERVER_ERROR,
  });
};
