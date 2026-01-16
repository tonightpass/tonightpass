import type { ParamValue } from "pathcat";
import type {
  CreateUserDto,
  GoogleOneTapDto,
  OAuth2Provider,
  RecoveryDto,
  RecoveryResetDto,
  SignInUserDto,
} from "../rest";
import { sdk } from "./builder";

export const auth = sdk((client) => ({
  signIn: async (data: SignInUserDto) => client.post("/auth/sign-in", data),
  signUp: async (data: CreateUserDto) => client.post("/auth/sign-up", data),
  signOut: async () => client.post("/auth/sign-out", undefined),
  refreshToken: async () => client.post("/auth/refresh-token", undefined),

  recovery: async (data: RecoveryDto) => client.post("/auth/recovery", data),
  recoveryReset: async (data: RecoveryResetDto) =>
    client.post("/auth/recovery/reset", data),

  oauth2: {
    connect: (
      provider: OAuth2Provider,
      params?: Record<string, ParamValue>
    ) => {
      return client.url("/oauth2/:provider", { provider, ...params });
    },
    disconnect: async (provider: OAuth2Provider) =>
      client.delete("/oauth2/:provider", undefined, { provider }),
    googleOneTap: async (data: GoogleOneTapDto) =>
      client.post("/oauth2/google/one-tap", data),
  },
}));
