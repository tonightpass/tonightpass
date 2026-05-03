import type Stripe from "stripe";
import type { Endpoint } from "../../endpoints";
import type { ArrayOptions, ArrayResult, Base, UserProfile } from "..";
import { Currency } from "../currencies";

export type OrderItem = {
  ticketId: string;
  ticketName: string;
  quantity: number;
  unitAmount: number;
  totalAmount: number;
};

export enum OrderTransferStatus {
  Completed = "completed",
  Pending = "pending",
  Transferred = "transferred",
}

export type Order = Base & {
  paymentIntent: Stripe.PaymentIntent;
  items: OrderItem[];
  currency: Currency;
  subtotal: number;
  fee: number;
  total: number;
  transferStatus: OrderTransferStatus;
  user: UserProfile;
};

export type OrderEndpoints =
  | Endpoint<"GET", "/orders", ArrayResult<Order>, ArrayOptions<Order>>
  | Endpoint<"GET", "/orders/:orderId", Order>;
