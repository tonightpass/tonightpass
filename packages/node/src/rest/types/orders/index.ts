import Stripe from "stripe";

import { ArrayOptions, ArrayResult, Base } from "..";
import { Endpoint } from "../../endpoints";
import { User } from "../users";

export type Order = Base & {
  session: Stripe.Checkout.Session;
  user: User;
};

export type OrderEndpoints =
  | Endpoint<"GET", "/orders", ArrayResult<Order>, ArrayOptions<Order>>
  | Endpoint<"GET", "/orders/:sessionId", Order>;
