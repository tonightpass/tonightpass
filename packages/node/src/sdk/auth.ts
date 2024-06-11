import { ParamValue } from "pathcat";

import { sdk } from "./builder";
import { CreateUserDto, SignInUserDto } from "../rest";
import { isBrowser } from "../utils";

export const auth = sdk((client) => ({
  signIn: async (data: SignInUserDto) => client.post("/auth/sign-in", data),
  signUp: async (data: CreateUserDto) => client.post("/auth/sign-up", data),
  signOut: async () => client.post("/auth/sign-out", null),
  refreshToken: async () => client.post("/auth/refresh-token", null),

  oauth2: {
    google: {
      connect: (params?: Record<string, ParamValue>) => {
        if (isBrowser) {
          window.location.href = client.url("/oauth2/google", params || {});
        } else {
          throw new Error("Google OAuth2 is only available in the browser");
        }
      },
    },
    twitter: {
      connect: (params?: Record<string, ParamValue>) => {
        if (isBrowser) {
          window.location.href = client.url("/oauth2/twitter", params || {});
        } else {
          throw new Error("Twitter OAuth2 is only available in the browser");
        }
      },
    },
    facebook: {
      connect: (params?: Record<string, ParamValue>) => {
        if (isBrowser) {
          window.location.href = client.url("/oauth2/facebook", params || {});
        } else {
          throw new Error("Facebook OAuth2 is only available in the browser");
        }
      },
    },
  },
}));
