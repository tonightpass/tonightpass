import { Endpoint } from "../../endpoints";

export type NotificationsEndpoints = Endpoint<
  "POST",
  "/notifications/subscribe/beta",
  null,
  { email: string }
>;
