import {
  OrganizationEventTicket,
  Organization,
  OrganizationEventTicketEndpoints,
} from "..";
import { OrganizationEventOrderEndpoints } from "./orders";
import {
  OrganizationEventStyle,
  OrganizationEventStyleEndpoints,
} from "./styles";
import { ArrayOptions, ArrayResult, Base, Location } from "../..";
import { OrganizationEventViewEndpoints } from "./views";
import {
  CreateOrganizationEventDto,
  UpdateOrganizationEventDto,
} from "../../../dtos";
import { Endpoint } from "../../../endpoints";

export * from "./orders";
export * from "./tickets";
export * from "./styles";

export type OrganizationEvent = Base & {
  title: string;
  description: string;
  slug: string;
  organization: Organization;
  type: OrganizationEventType;
  visibility: OrganizationEventVisibilityType;
  flyers: string[];
  trailers: string[];
  location: Location;
  tickets: OrganizationEventTicket[];
  styles: OrganizationEventStyle[];
  viewsCount: number;
  sessionsCount: number;
  totalViewsCount: number;
  averageViewsPerSessionCount: number;
  startAt: Date;
  endAt: Date;
};

export enum OrganizationEventType {
  Clubbing = "clubbing",
  Concert = "concert",
  Afterwork = "afterwork",
  DancingLunch = "dancing_lunch",
  Diner = "diner",
  Garden = "garden",
  AfterBeach = "after_beach",
  Festival = "festival",
  Spectacle = "spectacle",
  Cruise = "cruise",
  OutsideAnimation = "outside_animation",
  Sport = "sport",
  Match = "match",
  Seminar = "seminar",
  Conference = "conference",
  WellnessDay = "wellness_day",
  Workshop = "workshop",
  TradeFair = "trade_fair",
  ConsumerShow = "consumer_show",
  Membership = "membership",
}

export enum OrganizationEventVisibilityType {
  Public = "public",
  Unlisted = "unlisted",
  Private = "private",
}

export enum OrganizationEventFileType {
  Flyer = "flyer",
  Trailer = "trailer",
}

export type OrganizationEventEndpoints =
  | Endpoint<
      "GET",
      "/organizations/events/search",
      OrganizationEvent[],
      { q: string; limit?: number }
    >
  | Endpoint<
      "GET",
      "/organizations/events",
      ArrayResult<OrganizationEvent>,
      ArrayOptions<OrganizationEvent>
    >
  | Endpoint<
      "GET",
      "/organizations/events/suggestions",
      ArrayResult<OrganizationEvent>,
      ArrayOptions<OrganizationEvent>
    >
  | Endpoint<
      "GET",
      "/organizations/events/nearby",
      ArrayResult<OrganizationEvent>,
      ArrayOptions<OrganizationEvent> & {
        latitude: number;
        longitude: number;
        radius?: number;
      }
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/events",
      ArrayResult<OrganizationEvent>,
      ArrayOptions<OrganizationEvent>
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/events/past",
      ArrayResult<OrganizationEvent>,
      ArrayOptions<OrganizationEvent>
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/events/upcoming",
      ArrayResult<OrganizationEvent>,
      ArrayOptions<OrganizationEvent>
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/events/:eventSlug",
      OrganizationEvent
    >
  | Endpoint<
      "POST",
      "/organizations/:organizationSlug/events",
      OrganizationEvent,
      CreateOrganizationEventDto
    >
  | Endpoint<
      "PUT",
      "/organizations/:organizationSlug/events/:eventSlug",
      OrganizationEvent,
      UpdateOrganizationEventDto
    >
  | Endpoint<
      "DELETE",
      "/organizations/:organizationSlug/events/:eventSlug",
      OrganizationEvent,
      null
    >
  | Endpoint<
      "POST",
      "/organizations/:organizationSlug/events/:eventSlug/files/:eventFileType",
      string,
      FormData
    >
  | OrganizationEventOrderEndpoints
  | OrganizationEventStyleEndpoints
  | OrganizationEventTicketEndpoints
  | OrganizationEventViewEndpoints;
