import {
  CreateOrganizationEventStyleDto,
  UpdateOrganizationEventStyleDto,
} from "../../../../dtos/organizations/events/events";
import { Endpoint } from "../../../../endpoints";

export type OrganizationEventStyle = {
  type: OrganizationEventStyleType;
  emoji: string;
  name: string;
  slug: string;
};

export enum OrganizationEventStyleType {
  Music = "music",
  Dress = "dress",
  Sport = "sport",
  Food = "food",
  Art = "art",
}

export type OrganizationEventStyleEndpoints =
  | Endpoint<"GET", "/organizations/events/styles", OrganizationEventStyle[]>
  | Endpoint<
      "GET",
      "/organizations/events/styles/:slug",
      OrganizationEventStyle
    >
  | Endpoint<
      "POST",
      "/organizations/events/styles",
      OrganizationEventStyle,
      CreateOrganizationEventStyleDto
    >
  | Endpoint<
      "PUT",
      "/organizations/events/styles/:slug",
      OrganizationEventStyle,
      UpdateOrganizationEventStyleDto
    >
  | Endpoint<
      "DELETE",
      "/organizations/events/styles/:slug",
      OrganizationEventStyle[],
      null
    >;
