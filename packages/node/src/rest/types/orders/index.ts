import type Stripe from "stripe";
import type { Endpoint } from "../../endpoints";
import type { ArrayOptions, ArrayResult, Base, UserProfile } from "..";

export type Order = Base & {
  invoice: Stripe.Invoice;
  user: UserProfile;
};

export type OrderEndpoints =
  | Endpoint<"GET", "/orders", ArrayResult<Order>, ArrayOptions<Order>>
  | Endpoint<"GET", "/orders/:orderId", Order>;
