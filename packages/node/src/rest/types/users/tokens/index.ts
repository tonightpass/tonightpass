import { User } from "..";

export type UserToken = {
  type: UserTokenType;
  value: string;
  createdAt: Date;
  expiresAt: Date;
  user?: User;
  identifier?: string;
};

export enum UserTokenType {
  Authentication = "authentication",
  BookingTicket = "booking_ticket",
  OrganizationInvite = "organization_invite",
  PasswordRecovery = "password_recovery",
  EmailValidation = "email_validation",
  PhoneValidation = "phone_validation",
}
