import Stripe from "stripe";

import { ArrayOptions, ArrayResult, Base } from "..";
import { Endpoint } from "../../endpoints";
import { User } from "../users";

export type Order = Base & {
  invoice: Stripe.Invoice;
  user: User;
};

export type OrderEndpoints =
  | Endpoint<"GET", "/orders", ArrayResult<Order>, ArrayOptions<Order>>
  | Endpoint<"GET", "/orders/:orderId", Order>;
