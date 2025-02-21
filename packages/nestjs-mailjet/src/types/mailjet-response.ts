export interface MailjetResponse {
  response: { status: number };
  body: { Count: number; Data: unknown[] };
}

export interface MailjetErrorResponse {
  ErrorIdentifier: string;
  ErrorCode: string;
  StatusCode: number;
  ErrorMessage: string;
}
