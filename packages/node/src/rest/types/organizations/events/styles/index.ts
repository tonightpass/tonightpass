import type {
  CreateOrganizationEventStyleDto,
  UpdateOrganizationEventStyleDto,
} from "../../../../dtos/organizations/events/styles";
import type { Endpoint } from "../../../../endpoints";
import type { Base } from "../../..";

export type OrganizationEventStyle = Base & {
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
      "/organizations/events/styles/:styleSlug",
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
      "/organizations/events/styles/:styleSlug",
      OrganizationEventStyle,
      UpdateOrganizationEventStyleDto
    >
  | Endpoint<
      "DELETE",
      "/organizations/events/styles/:styleSlug",
      OrganizationEventStyle[],
      null
    >;
