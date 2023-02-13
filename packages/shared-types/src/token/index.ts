export type UserToken = {
  id: string;
  type: UserTokenType;
  value: string;
  createdAt: Date;
  expiresAt: Date;
};

export enum UserTokenType {
  Authentication,
  Organization_Invite,
  Password_Recovery,
  Email_Validation,
  Phone_Validation,
}
