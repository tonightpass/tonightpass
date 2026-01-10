import { ArrayResult, Base, UserProfile } from "..";
import { CreateApiKeyDto, UpdateApiKeyDto } from "../../dtos";
import { Endpoint } from "../../endpoints";

export enum ApiKeyTier {
  PUBLIC = "public",
  BUILD = "build",
  PREMIUM = "premium",
  INTERNAL = "internal",
}

export type ApiKey = Base & {
  key: string;
  name: string;
  tier: ApiKeyTier;
  rateLimit: number;
  user: UserProfile;
  lastUsedAt?: Date;
  isActive: boolean;
};

export type ApiKeyEndpoints =
  | Endpoint<"GET", "/api-keys", ArrayResult<ApiKey>>
  | Endpoint<"GET", "/api-keys/:apiKeyId", ApiKey>
  | Endpoint<"POST", "/api-keys", ApiKey, CreateApiKeyDto>
  | Endpoint<"PUT", "/api-keys/:apiKeyId", ApiKey, UpdateApiKeyDto>
  | Endpoint<"DELETE", "/api-keys/:apiKeyId", ApiKey, null>;
