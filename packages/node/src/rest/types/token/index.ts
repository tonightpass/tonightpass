export type UserToken = {
  id: string;
  type: UserTokenType;
  value: string;
  createdAt: Date;
  expiresAt: Date;
};

export enum UserTokenType {
  Authentication = "authentication",
  OrganizationInvite = "organization_invite",
  PasswordRecovery = "password_recovery",
  EmailValidation = "email_validation",
  PhoneValidation = "phone_validation",
}
