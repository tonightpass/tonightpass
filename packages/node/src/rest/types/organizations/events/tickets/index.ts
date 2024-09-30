import Stripe from "stripe";

import { Base } from "../../..";
import {
  CreateOrganizationEventTicketDto,
  UpdateOrganizationEventTicketDto,
} from "../../../../dtos";
import { Endpoint } from "../../../../endpoints";

export type OrganizationEventTicket = Base & {
  name: string;
  description?: string;
  price: Stripe.Price;
  product: Stripe.Product;
  fee: number;
  quantity: number;
  type: OrganizationEventTicketType;
  category: OrganizationEventTicketCategory;
  externalId?: string;
  isVisible: boolean;
  isFeesIncluded: boolean;
  startAt?: Date;
  endAt?: Date;
};

export enum OrganizationEventTicketType {
  ETicket = "e-ticket",
  Other = "other",
}

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
      "/organizations/:organizationSlug/events/:eventSlug/tickets",
      OrganizationEventTicket[]
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/events/:eventSlug/tickets/:ticketId",
      OrganizationEventTicket
    >
  | Endpoint<
      "POST",
      "/organizations/:organizationSlug/events/:eventSlug/tickets",
      OrganizationEventTicket,
      CreateOrganizationEventTicketDto
    >
  | Endpoint<
      "PUT",
      "/organizations/:organizationSlug/events/:eventSlug/tickets/:ticketId",
      OrganizationEventTicket,
      UpdateOrganizationEventTicketDto
    >
  | Endpoint<
      "DELETE",
      "/organizations/:organizationSlug/events/:eventSlug/tickets/:ticketId",
      OrganizationEventTicket[],
      null
    >;
