import Stripe from "stripe";

import { ArrayOptions, ArrayResult, Base } from "..";
import { Endpoint } from "../../endpoints";
import { User } from "../users";

export type Invoice = Stripe.Response<Stripe.Invoice> & {
  payment_intent?: string | Stripe.PaymentIntent;
  client_secret?: string;
  confirmation_secret?: string;
};

export type Order = Base & {
  invoice: Invoice;
  user: User;
};

export type OrderEndpoints =
  | Endpoint<"GET", "/orders", ArrayResult<Order>, ArrayOptions<Order>>
  | Endpoint<"GET", "/orders/:orderId", Order>;
