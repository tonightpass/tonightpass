import { sdk } from "./builder";

export const users = sdk((client) => ({
  me: {
    get: async () => client.get("/users/me"),
  },
}));
