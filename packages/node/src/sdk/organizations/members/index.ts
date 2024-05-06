import { Client } from "../../../rest";

export const organizationsMembers = (client: Client) => ({
  getAll: async () => client.get("/organizations/members"),
  delete: async (id: string) =>
    client.delete("/organizations/members/:id", null, { id }),
});
