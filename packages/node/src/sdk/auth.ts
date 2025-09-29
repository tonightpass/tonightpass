import { ParamValue } from "pathcat";

import { sdk } from "./builder";
import {
  CreateUserDto,
  SignInUserDto,
  RecoveryDto,
  RecoveryResetDto,
  OAuth2Provider,
} from "../rest";
import { isBrowser } from "../utils";

export const auth = sdk((client) => ({
  signIn: async (data: SignInUserDto) => client.post("/auth/sign-in", data),
  signUp: async (data: CreateUserDto) => client.post("/auth/sign-up", data),
  signOut: async () => client.post("/auth/sign-out", null),
  refreshToken: async () => client.post("/auth/refresh-token", null),

  recovery: async (data: RecoveryDto) => client.post("/auth/recovery", data),
  recoveryReset: async (data: RecoveryResetDto) =>
    client.post("/auth/recovery/reset", data),

  oauth2: {
    disconnect: async (provider: OAuth2Provider) =>
      client.delete("/oauth2/:provider", undefined, { provider }),
    connect: (
      provider: OAuth2Provider,
      params?: Record<string, ParamValue>,
    ) => {
      if (isBrowser) {
        window.location.href = client.url("/oauth2/:provider", {
          provider,
          ...params,
        });
      } else {
        throw new Error(`${provider} OAuth2 is only available in the browser`);
      }
    },
  },
}));
