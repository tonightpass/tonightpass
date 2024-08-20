import Stripe from "stripe";

import { Base } from "..";
import { User } from "../users";

export type Order = Base & {
  session: Stripe.Checkout.Session;
  user: User;
};
