import { Organization } from "..";
import { Base } from "../..";

export type OrganizationToken = Omit<Base, "updatedAt"> & {
  type: OrganizationTokenType;
  value: string;
  expiresAt: Date;
  organization?: Organization;
  role?: string;
};

export enum OrganizationTokenType {
  InvitationLink = "invitation_link",
}
