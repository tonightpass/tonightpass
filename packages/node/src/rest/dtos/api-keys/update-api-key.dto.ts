import { ApiKeyTier } from "../../types";

export type UpdateApiKeyDto = {
  name?: string;
  tier?: ApiKeyTier;
  isActive?: boolean;
};
