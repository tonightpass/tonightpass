import { CreateApiKeyDto, UpdateApiKeyDto } from "../../rest";
import { sdk } from "../builder";

export const apiKeys = sdk((client) => ({
  getAll: async () => client.get("/api-keys"),
  get: async (apiKeyId: string) =>
    client.get("/api-keys/:apiKeyId", { apiKeyId }),
  create: async (data: CreateApiKeyDto) => client.post("/api-keys", data),
  update: async (apiKeyId: string, data: UpdateApiKeyDto) =>
    client.put("/api-keys/:apiKeyId", data, { apiKeyId }),
  delete: async (apiKeyId: string) =>
    client.delete("/api-keys/:apiKeyId", undefined, { apiKeyId }),
}));
