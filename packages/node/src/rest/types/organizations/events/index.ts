import { OrganizationEventTicket, OrganizationEventTicketEndpoints } from "..";
import { OrganizationEventOrderEndpoints } from "./orders";
import {
  OrganizationEventStyle,
  OrganizationEventStyleEndpoints,
} from "./styles";
import {
  ArrayOptions,
  ArrayResult,
  Base,
  Location,
  OrganizationProfile,
} from "../..";
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
  organization: OrganizationProfile;
  type: OrganizationEventType;
  visibility: OrganizationEventVisibilityType;
  flyers: string[];
  trailers: string[];
  location: Location;
  tickets: OrganizationEventTicket[];
  styles: OrganizationEventStyle[];
  status: OrganizationEventStatus;
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
  Festival = "festival",
  HouseParty = "house_party",
  FriendsParty = "friends_party",
  Afterwork = "afterwork",
  DancingLunch = "dancing_lunch",
  Diner = "diner",
  Garden = "garden",
  AfterBeach = "after_beach",
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

export enum OrganizationEventStatus {
  Upcoming = "upcoming",
  Ongoing = "ongoing",
  Ended = "ended",
}

export type OrganizationEventArrayOptions = ArrayOptions<OrganizationEvent> & {
  status?: OrganizationEventStatus | OrganizationEventStatus[];
  types?: OrganizationEventType | OrganizationEventType[];
  styles?: string | string[];
};

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
      OrganizationEventArrayOptions
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
      OrganizationEventArrayOptions
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
  | Endpoint<"POST", "/events/files/:eventFileType", string, FormData>
  | OrganizationEventOrderEndpoints
  | OrganizationEventStyleEndpoints
  | OrganizationEventTicketEndpoints
  | OrganizationEventViewEndpoints;
