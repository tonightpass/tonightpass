import Stripe from "stripe";

import { Endpoint } from "../../endpoints";

export type WebhookEndpoints = Endpoint<
  "POST",
  "/webhooks/stripe",
  boolean,
  Stripe.Event
>;
