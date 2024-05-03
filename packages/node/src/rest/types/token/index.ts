import { Base } from "..";
import { User } from "../users";

export type UserToken = Base & {
  type: UserTokenType;
  value: string;
  expiresAt: Date;
  user?: User;
  identifier?: string;
};

export enum UserTokenType {
  Authentication = "authentication",
  OrganizationInvite = "organization_invite",
  PasswordRecovery = "password_recovery",
  EmailValidation = "email_validation",
  PhoneValidation = "phone_validation",
}
