import type { Endpoint } from "../../endpoints";

export type NotificationEndpoints = Endpoint<
  "POST",
  "/notifications/subscribe/beta",
  null,
  { email: string }
>;
