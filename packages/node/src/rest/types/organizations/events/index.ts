import type {
  CreateOrganizationEventDto,
  UpdateOrganizationEventDto,
} from "../../../dtos";
import type { Endpoint } from "../../../endpoints";
import type {
  ArrayOptions,
  ArrayResult,
  Base,
  Location,
  OrganizationProfile,
} from "../..";
import type {
  OrganizationEventTicket,
  OrganizationEventTicketEndpoints,
} from "..";
import type { OrganizationEventOrderEndpoints } from "./orders";
import type {
  OrganizationEventStyle,
  OrganizationEventStyleEndpoints,
} from "./styles";
import type { OrganizationEventViewEndpoints } from "./views";

export * from "./orders";
export * from "./styles";
export * from "./tickets";

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

export type SearchOrganizationEventsOptions =
  ArrayOptions<OrganizationEvent> & {
    q: string;
  };

export interface OrganizationEventCalendar {
  [date: string]: OrganizationEvent[];
}

export type OrganizationEventEndpoints =
  | Endpoint<
      "GET",
      "/organizations/events/search",
      ArrayResult<OrganizationEvent>,
      SearchOrganizationEventsOptions
    >
  | Endpoint<
      "GET",
      "/organizations/events/calendar/:year/:month",
      OrganizationEventCalendar
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
      "/organizations/@:organizationSlug/events",
      ArrayResult<OrganizationEvent>,
      OrganizationEventArrayOptions
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/events/:eventSlug",
      OrganizationEvent
    >
  | Endpoint<
      "POST",
      "/organizations/@:organizationSlug/events",
      OrganizationEvent,
      CreateOrganizationEventDto
    >
  | Endpoint<
      "PUT",
      "/organizations/@:organizationSlug/events/:eventSlug",
      OrganizationEvent,
      UpdateOrganizationEventDto
    >
  | Endpoint<
      "DELETE",
      "/organizations/@:organizationSlug/events/:eventSlug",
      OrganizationEvent,
      null
    >
  | Endpoint<
      "POST",
      "/organizations/@:organizationSlug/events/:eventSlug/files/:eventFileType",
      string,
      FormData
    >
  | Endpoint<"POST", "/events/files/:eventFileType", string, FormData>
  | OrganizationEventOrderEndpoints
  | OrganizationEventStyleEndpoints
  | OrganizationEventTicketEndpoints
  | OrganizationEventViewEndpoints;
