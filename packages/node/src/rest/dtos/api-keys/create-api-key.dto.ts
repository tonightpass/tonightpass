import { ApiKeyTier } from "../../types";

export type CreateApiKeyDto = {
  name: string;
  tier: ApiKeyTier;
};
