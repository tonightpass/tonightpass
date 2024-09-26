import { sdk } from "./builder";

export const notifications = sdk((client) => ({
  registerToBeta: async (email: string) =>
    client.post("/notifications/subscribe/beta", { email }),
}));
