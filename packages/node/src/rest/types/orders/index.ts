import Stripe from "stripe";

import { ArrayOptions, ArrayResult, Base, UserProfile } from "..";
import { Endpoint } from "../../endpoints";

export type Order = Base & {
  invoice: Stripe.Invoice;
  user: UserProfile;
};

export type OrderEndpoints =
  | Endpoint<"GET", "/orders", ArrayResult<Order>, ArrayOptions<Order>>
  | Endpoint<"GET", "/orders/:orderId", Order>;
