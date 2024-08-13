import { Client } from "../../../rest";

export const organizationsMembers = (client: Client) => ({
  getAll: async () => client.get("/organizations/members"),
  delete: async (memberId: string) =>
    client.delete("/organizations/members/:memberId", null, { memberId }),
});
