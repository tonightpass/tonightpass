import { Base, Currency } from "../../..";
import {
  CreateOrganizationEventTicketDto,
  UpdateOrganizationEventTicketDto,
} from "../../../../dtos";
import { Endpoint } from "../../../../endpoints";

export type OrganizationEventTicket = Base & {
  name: string;
  description?: string;
  price: number;
  displayPrice: number;
  quantity: number;
  type: OrganizationEventTicketType;
  category: OrganizationEventTicketCategory;
  currency: Currency;
  vatRate: number;
  externalId?: string;
  isVisible: boolean;
  isFeesIncluded: boolean;
  startAt: Date;
  endAt: Date;
};

export type OrganizationEventTicketType = "e-ticket" | "other";

export enum OrganizationEventTicketCategory {
  Entry = "entry",
  Package = "package",
  Meal = "meal",
  Drink = "drink",
  Parking = "parking",
  Accommodation = "accommodation",
  Camping = "camping",
  Locker = "locker",
  Shuttle = "shuttle",
  Other = "other",
}

export type OrganizationEventTicketEndpoints =
  | Endpoint<
      "GET",
      "/organizations/:slug/events/:eventSlug/tickets",
      OrganizationEventTicket[]
    >
  | Endpoint<
      "GET",
      "/organizations/:slug/events/:eventSlug/tickets/:ticketId",
      OrganizationEventTicket
    >
  | Endpoint<
      "POST",
      "/organizations/:slug/events/:eventSlug/tickets",
      OrganizationEventTicket,
      CreateOrganizationEventTicketDto
    >
  | Endpoint<
      "PUT",
      "/organizations/:slug/events/:eventSlug/tickets/:ticketId",
      OrganizationEventTicket,
      UpdateOrganizationEventTicketDto
    >
  | Endpoint<
      "DELETE",
      "/organizations/:slug/events/:eventSlug/tickets/:ticketId",
      OrganizationEventTicket[],
      null
    >;
