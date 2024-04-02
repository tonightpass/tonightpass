import { sdk } from "./builder";
import { CreateOrganizationDto, UpdateOrganizationDto } from "../rest";

export const organizations = sdk((client) => ({
  getAll: async () => client.get("/organizations"),
  get: async (id: string) => client.get("/organizations/:id", { id }),
  create: async (data: CreateOrganizationDto) =>
    client.post("/organizations", data),
  update: async (id: string, data: UpdateOrganizationDto) =>
    client.put("/organizations/:id", data, { id }),
  delete: async (id: string) => client.delete("/organizations/:id", { id }),
}));
