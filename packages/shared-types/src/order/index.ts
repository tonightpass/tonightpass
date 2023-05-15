import { EventTicket } from "../event";
import { User } from "../user";

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

export type Order = {
  id: string;
  user: User;
  status: OrderStatus;
  items: EventTicket[];
  promoCode?: PromoCode;
  total: number;
  currency: string;
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
