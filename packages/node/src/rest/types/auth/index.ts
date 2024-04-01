import { CreateUserDto, SignInUserDto } from "../../dtos";
import { Endpoint } from "../../endpoints";
import { User } from "../users";

export type AuthEndpoints =
  | Endpoint<"POST", "/auth/sign-up", User, CreateUserDto>
  | Endpoint<"POST", "/auth/sign-in", User, SignInUserDto>
  | Endpoint<"POST", "/auth/sign-out", void>
  | Endpoint<"POST", "/auth/refresh-token", User>;
