import { Organization, OrganizationMemberRole } from "..";
import { Base } from "../..";

export type OrganizationToken = Omit<Base, "updatedAt"> & {
  type: OrganizationTokenType;
  value: string;
  expiresAt: Date;
  organization?: Organization;
  role?: OrganizationMemberRole;
};

export enum OrganizationTokenType {
  InvitationLink = "invitation_link",
}
