import { Currency } from "..";
import { Event, EventTicket } from "../organizations/events";
import { User } from "../users";

export enum OrderStatus {
  Created = "created",
  Cancelled = "cancelled",
  Completed = "completed",
  Pending = "pending",
  Confirmed = "confirmed",
  Declined = "declined",
  Refunded = "refunded",
  PartiallyRefunded = "partially_refunded",
  Expired = "expired",
}

export type OrderItem = {
  id: string;
  ticket: EventTicket;
  isUsed: boolean;
  updatedAt: Date;
  createdAt: Date;
};

export type Order = {
  id: string;
  owner: User;
  members: User[];
  status: OrderStatus;
  event: Event;
  items: OrderItem[];
  promoCode?: PromoCode;
  total: number;
  currency: Currency;
  createdAt: Date;
};

export type PromoCode = {
  id: string;
  code: string;
  used: number;
  discount: number;
  isActive: boolean;
  expirationAt: Date;
  createdAt: Date;
};
