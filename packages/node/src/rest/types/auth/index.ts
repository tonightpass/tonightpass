import {
  CreateUserDto,
  SignInUserDto,
  RecoveryDto,
  RecoveryResetDto,
} from "../../dtos";
import { Endpoint } from "../../endpoints";
import { User } from "../users";

export type RecoveryResponse = {
  to: string;
};

export type AuthEndpoints =
  | Endpoint<"POST", "/auth/sign-up", User, CreateUserDto>
  | Endpoint<"POST", "/auth/sign-in", User, SignInUserDto>
  | Endpoint<"POST", "/auth/sign-out", null, null>
  | Endpoint<"POST", "/auth/refresh-token", null, null>
  | Endpoint<"POST", "/auth/recovery", RecoveryResponse, RecoveryDto>
  | Endpoint<"POST", "/auth/recovery/reset", null, RecoveryResetDto>
  | Endpoint<"GET", "/oauth2/google", void>
  | Endpoint<"GET", "/oauth2/google/callback", void>
  | Endpoint<"GET", "/oauth2/facebook", void>
  | Endpoint<"GET", "/oauth2/facebook/callback", void>
  | Endpoint<"GET", "/oauth2/twitter", void>
  | Endpoint<"GET", "/oauth2/twitter/callback", void>;
