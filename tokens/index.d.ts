export type UserToken = {
  id: string;
  type: UserTokenType;
  value: string;
  createdAt: Date;
  expiresAt: Date;
}

export type UserTokenType = "recovery" | "email" | "phone";