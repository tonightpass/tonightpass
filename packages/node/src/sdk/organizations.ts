import { sdk } from "./builder";
import { CreateOrganizationDto, UpdateOrganizationDto } from "../rest";

export const organizations = sdk((client) => ({
  getAll: async () => client.get("/organizations"),
  get: async (slug: string) => client.get("/organizations/:slug", { slug }),
  create: async (data: CreateOrganizationDto) =>
    client.post("/organizations", data),
  update: async (slug: string, data: UpdateOrganizationDto) =>
    client.put("/organizations/:slug", data, { slug }),
  delete: async (slug: string) =>
    client.delete("/organizations/:slug", null, { slug }),
  members: {
    getAll: async () => client.get("/organizations/members"),
    delete: async (id: string) =>
      client.delete("/organizations/members/:id", null, { id }),
  },
}));
