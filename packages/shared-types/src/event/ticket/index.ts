import { Currency } from "../..";

export type EventTicket = {
  id: string;
  name: string;
  description?: string;
  unitPrice: number;
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
  ENTRY = "entry",
  PACKAGE = "package",
  MEAL = "meal",
  DRINK = "drink",
  PARKING = "parking",
  ACCOMMODATION = "accommodation",
  CAMPING = "camping",
  LOCKER = "locker",
  SHUTTLE = "shuttle",
  OTHER = "other",
}
