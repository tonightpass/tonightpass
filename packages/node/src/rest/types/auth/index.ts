import {
  CreateUserDto,
  SignInUserDto,
  RecoveryDto,
  RecoveryResetDto,
} from "../../dtos";
import { Endpoint } from "../../endpoints";
import { User } from "../users";

export enum OAuth2Provider {
  Google = "google",
  Facebook = "facebook",
  Apple = "apple",
  Twitter = "twitter",
}

export type RecoveryResponse = {
  to: string;
};

export type OAuth2ProviderParams = {
  provider: OAuth2Provider;
};

export type AuthEndpoints =
  | Endpoint<"POST", "/auth/sign-up", User, CreateUserDto>
  | Endpoint<"POST", "/auth/sign-in", User, SignInUserDto>
  | Endpoint<"POST", "/auth/sign-out", null, null>
  | Endpoint<"POST", "/auth/refresh-token", null, null>
  | Endpoint<"POST", "/auth/recovery", RecoveryResponse, RecoveryDto>
  | Endpoint<"POST", "/auth/recovery/reset", null, RecoveryResetDto>
  | Endpoint<"GET", "/oauth2/:provider", void, OAuth2ProviderParams>
  | Endpoint<"GET", "/oauth2/:provider/callback", void, OAuth2ProviderParams>
  | Endpoint<"DELETE", "/oauth2/:provider", void>;
