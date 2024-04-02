import { sdk } from "./builder";
import { CreateUserDto, SignInUserDto } from "../rest";

export const auth = sdk((client) => ({
  signIn: async (data: SignInUserDto) => client.post("/auth/sign-in", data),
  signUp: async (data: CreateUserDto) => client.post("/auth/sign-up", data),
  signOut: async () => client.post("/auth/sign-out", null),
  refreshToken: async () => client.post("/auth/refresh-token", null),
}));
