import {
  OrganizationEventStyle,
  OrganizationEventStyleEndpoints,
} from "./styles";
import {
  OrganizationEventTicket,
  Organization,
  OrganizationEventTicketEndpoints,
} from "..";
import { Base, Location } from "../..";
import {
  CreateOrganizationEventDto,
  UpdateOrganizationEventDto,
} from "../../../dtos";
import { Endpoint } from "../../../endpoints";

export * from "./tickets";
export * from "./styles";

export type OrganizationEvent = Base & {
  title: string;
  description: string;
  slug: string;
  organization: Organization;
  type: OrganizationEventType;
  public: boolean;
  flyers: string[];
  trailers: string[];
  location: Location;
  tickets: OrganizationEventTicket[];
  styles: OrganizationEventStyle[];
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

export type OrganizationEventEndpoints =
  | Endpoint<"GET", "/organizations/:organizationSlug/events", Event[]>
  | Endpoint<"GET", "/organizations/:organizationSlug/events/:eventSlug", Event>
  | Endpoint<
      "POST",
      "/organizations/:organizationSlug/events",
      Event,
      CreateOrganizationEventDto
    >
  | Endpoint<
      "PUT",
      "/organizations/:organizationSlug/events/:eventSlug",
      Event,
      UpdateOrganizationEventDto
    >
  | Endpoint<
      "DELETE",
      "/organizations/:organizationSlug/events/:eventSlug",
      Event,
      null
    >
  | OrganizationEventStyleEndpoints
  | OrganizationEventTicketEndpoints;
