import { MailjetResponse } from "../types/mailjet-response";

export const isSuccessfulResponse = (
  result: MailjetResponse,
  expectedStatus: number = 200,
): boolean => {
  return result.response.status === expectedStatus && result.body.Count > 0;
};
