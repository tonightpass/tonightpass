import type Stripe from "stripe";

import type { Endpoint } from "../../endpoints";

export type WebhookEndpoints = Endpoint<
  "POST",
  "/webhooks/stripe",
  boolean,
  Stripe.Event
>;
