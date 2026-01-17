import type {
  CreateUserDto,
  GoogleOneTapDto,
  RecoveryDto,
  RecoveryResetDto,
  SignInUserDto,
} from "../../dtos";
import type { Endpoint } from "../../endpoints";
import type { User } from "../users";

export enum OAuth2Provider {
  Google = "google",
  Facebook = "facebook",
  Twitter = "twitter",
}

export type AuthMethod = OAuth2Provider | "password";

export type RecoveryResponse = {
  to: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type AuthEndpoints =
  | Endpoint<"POST", "/auth/sign-up", AuthResponse, CreateUserDto>
  | Endpoint<"POST", "/auth/sign-in", AuthResponse, SignInUserDto>
  | Endpoint<"POST", "/auth/sign-out", null, undefined>
  | Endpoint<"POST", "/auth/refresh-token", AuthResponse, undefined>
  | Endpoint<"POST", "/auth/recovery", RecoveryResponse, RecoveryDto>
  | Endpoint<"POST", "/auth/recovery/reset", null, RecoveryResetDto>
  | Endpoint<"GET", "/oauth2/:provider", void>
  | Endpoint<"GET", "/oauth2/:provider/callback", void>
  | Endpoint<"GET", `/oauth2/${OAuth2Provider.Google}`, void>
  | Endpoint<"GET", `/oauth2/${OAuth2Provider.Google}/callback`, void>
  | Endpoint<
      "POST",
      `/oauth2/${OAuth2Provider.Google}/one-tap`,
      AuthResponse,
      GoogleOneTapDto
    >
  | Endpoint<"GET", `/oauth2/${OAuth2Provider.Facebook}`, void>
  | Endpoint<"GET", `/oauth2/${OAuth2Provider.Facebook}/callback`, void>
  | Endpoint<"GET", `/oauth2/${OAuth2Provider.Twitter}`, void>
  | Endpoint<"GET", `/oauth2/${OAuth2Provider.Twitter}/callback`, void>
  | Endpoint<"DELETE", "/oauth2/:provider", void, undefined>;
