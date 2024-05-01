import { organizationsBilling } from "./billing";
import { organizationsEvents } from "./events";
import { organizationsMembers } from "./members";
import { CreateOrganizationDto, UpdateOrganizationDto } from "../../rest";
import { sdk } from "../builder";

export const organizations = sdk((client) => ({
  getAll: async () => client.get("/organizations"),
  get: async (slug: string) => client.get("/organizations/:slug", { slug }),
  create: async (data: CreateOrganizationDto) =>
    client.post("/organizations", data),
  update: async (slug: string, data: UpdateOrganizationDto) =>
    client.put("/organizations/:slug", data, { slug }),
  delete: async (slug: string) =>
    client.delete("/organizations/:slug", null, { slug }),
  billing: organizationsBilling,
  events: organizationsEvents,
  members: organizationsMembers,
}));
