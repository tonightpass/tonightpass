import { MailjetResponse } from "../types/mailjet-response";

export const isMailjetResponse = (value: unknown): value is MailjetResponse => {
  return (
    typeof value === "object" &&
    value !== null &&
    "response" in value &&
    "body" in value &&
    typeof (value as MailjetResponse).body === "object" &&
    "Count" in (value as MailjetResponse).body
  );
};
