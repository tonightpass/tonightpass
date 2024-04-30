import { Currency } from "../../..";

export type EventTicket = {
  id: string;
  name: string;
  description?: string;
  price: number;
  displayPrice: number;
  quantity: number;
  type: EventTicketType;
  category: EventTicketCategory;
  currency: Currency;
  vatRate: number;
  externalId?: string;
  isVisible: boolean;
  isFeesIncluded: boolean;
  startAt: Date;
  endAt: Date;
  updatedAt: Date;
  createdAt: Date;
};

export type EventTicketType = "e-ticket" | "other";

export enum EventTicketCategory {
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
