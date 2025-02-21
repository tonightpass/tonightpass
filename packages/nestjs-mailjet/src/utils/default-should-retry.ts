import { MailjetErrorResponse } from "../types/mailjet-response";

export const defaultShouldRetry = (error: MailjetErrorResponse): boolean => {
  return error.StatusCode >= 500;
};
