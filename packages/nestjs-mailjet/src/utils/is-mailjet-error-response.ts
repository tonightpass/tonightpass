import { MailjetErrorResponse } from "../types/mailjet-response";

export const isMailjetErrorResponse = (
  value: unknown,
): value is MailjetErrorResponse => {
  return (
    typeof value === "object" &&
    value !== null &&
    "StatusCode" in value &&
    typeof (value as MailjetErrorResponse).StatusCode === "number"
  );
};
