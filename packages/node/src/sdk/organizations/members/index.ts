import { sdk } from "../../builder";

export const organizationsMembers = sdk((client) => ({
  getAll: async () => client.get("/organizations/members"),
  delete: async (id: string) =>
    client.delete("/organizations/members/:id", null, { id }),
}));
