import { Currency, Language, Location, Profile, ProfileMetadata } from "..";
import { UpdateUserDto } from "../../dtos";
import { Endpoint } from "../../endpoints";

export type User = {
  id: string;
  identifier: UserIdentifier;
  password: string;
  identity: UserIdentity;
  role: UserRole;
  addresses: Location[];
  preferences: UserPreferences;
  connections: UserConnection[];
  verified: boolean;
  updatedAt: Date;
  createdAt: Date;
};

export type UserIdentifier = {
  email?: string;
  phoneNumber?: string;
  username: string;

  [key: string]: string | undefined;
};

export type UserIdentity = Profile & {
  firstName: string;
  lastName: string;
  fullName: string;
  gender: UserIdentityGender;
  birthDate: Date;

  metadata: ProfileMetadata & {
    followingCount: number;
    hasPassPlus: boolean;
    idValid: boolean;
  };
};

export enum UserRole {
  USER = 0,
  DEVELOPER = 8,
  ADMINISTRATOR = 10,
}

export type UserIdentityGender =
  | "male"
  | "female"
  | "non-binary"
  | "gender-fluid"
  | "neutral"
  | "other"
  | string;

export type UserPreferences = {
  language: Language;
  currency: Currency;
  notifications: {
    email: {
      newsletter: boolean;
      message: boolean;
    };
    push: {
      message: boolean;
    };
  };
};

export type UserConnection = {
  ip: string;
  os: UserConnectionOS;
  device: UserConnectionDevice;
  client: UserConnectionClient;
  updatedAt: Date;
  createdAt: Date;
};

export type UserConnectionOS = {
  name: string;
  version: string;
};

export type UserConnectionDevice = {
  type: string;
  brand: string;
};

export type UserConnectionClient = {
  name: string;
  version: string;
};

export type UserEndpoints =
  | Endpoint<"GET", "/users", User[]>
  | Endpoint<"GET", "/users/:id", User, { id: string }>
  | Endpoint<"GET", "/users/me", User>
  | Endpoint<
      "GET",
      "/check/:identifier",
      UserIdentifier,
      { identifier: string }
    >
  | Endpoint<"PUT", "/users/:id", User, UpdateUserDto>;
