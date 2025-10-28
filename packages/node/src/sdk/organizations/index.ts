import { organizationsBilling } from "./billing";
import { organizationsCustomers } from "./customers";
import { organizationsEvents } from "./events";
import { organizationsMembers } from "./members";
import { organizationsOrders } from "./orders";
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
  OrganizationFileType,
} from "../../rest";
import { buildFileFormData } from "../../utils";
import { sdk } from "../builder";

export const organizations = sdk((client) => ({
  search: async (query: string, limit?: number) =>
    client.get("/organizations/search", { q: query, limit }),
  getAll: async () => client.get("/organizations"),
  get: async (organizationSlug: string) =>
    client.get("/organizations/:organizationSlug", { organizationSlug }),
  create: async (data: CreateOrganizationDto) =>
    client.post("/organizations", data),
  update: async (organizationSlug: string, data: UpdateOrganizationDto) =>
    client.put("/organizations/:organizationSlug", data, { organizationSlug }),
  delete: async (organizationSlug: string) =>
    client.delete("/organizations/:organizationSlug", null, {
      organizationSlug,
    }),
  uploadFile: async (
    organizationSlug: string,
    organizationFileType: OrganizationFileType,
    file: File,
  ) =>
    client.post(
      "/organizations/:organizationSlug/files/:organizationFileType",
      buildFileFormData("file", file),
      {
        organizationSlug,
        organizationFileType,
      },
    ),
  billing: organizationsBilling(client),
  events: organizationsEvents(client),
  members: organizationsMembers(client),
  customers: organizationsCustomers(client),
  orders: organizationsOrders(client),
}));
