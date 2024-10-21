import { User } from "..";
import { Base } from "../..";

export type UserToken = Omit<Base, "updatedAt"> & {
  type: UserTokenType;
  value: string;
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
