import type { CreateApiKeyDto, UpdateApiKeyDto } from "../../dtos";
import type { Endpoint } from "../../endpoints";
import type { ArrayResult, Base, UserProfile } from "..";

export enum ApiKeyTier {
  PUBLIC = "public",
  INTERNAL = "internal",
}

export enum ApiKeyType {
  User = "user",
  App = "app",
}

export type ApiKey = Base & {
  key: string;
  name: string;
  type: ApiKeyType;
  tier: ApiKeyTier;
  rateLimit: number;
  allowedOrigins: string[];
  user: UserProfile;
  lastUsedAt?: Date;
  isActive: boolean;
};

export type ApiKeyEndpoints =
  | Endpoint<"GET", "/api-keys", ArrayResult<ApiKey>>
  | Endpoint<"GET", "/api-keys/:apiKeyId", ApiKey>
  | Endpoint<"POST", "/api-keys", ApiKey, CreateApiKeyDto>
  | Endpoint<"PUT", "/api-keys/:apiKeyId", ApiKey, UpdateApiKeyDto>
  | Endpoint<"DELETE", "/api-keys/:apiKeyId", ApiKey, undefined>;
