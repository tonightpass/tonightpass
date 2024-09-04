import { sdk } from "./builder";

export const notifications = sdk((client) => ({
  registerToBeta: async () => client.get("/notifications/subscribe/beta"),
}));
