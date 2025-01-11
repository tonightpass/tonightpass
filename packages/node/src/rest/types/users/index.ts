import {
  Base,
  Currency,
  Language,
  Location,
  ProfileType,
  UserBookingEndpoints,
  UserProfile,
  UserProfileMetadata,
} from "..";
import { UserNotificationEndpoints } from "./notifications";
import { UpdateUserDto } from "../../dtos";
import { Endpoint } from "../../endpoints";

export * from "./bookings";
export * from "./notifications";
export * from "./tokens";

export type PublicUser = {
  identifier: Pick<UserIdentifier, "username">;

  identity: {
    displayName: string;
    avatarUrl: string;
    slug: string;
    type: ProfileType;
    metadata: UserProfileMetadata;
  };
};

export type User = Base & {
  identifier: UserIdentifier;
  password: string;
  identity: UserIdentity;
  role: UserRole;
  addresses: Location[];
  preferences: UserPreferences;
  connections: UserConnection[];
  verified: boolean;
};

export type UserIdentifier = {
  email?: string;
  phoneNumber?: string;
  username: string;

  [key: string]: string | undefined;
};

export type UserIdentity = UserProfile & {
  firstName: string;
  lastName: string;
  fullName: string;
  gender: UserIdentityGender;
  birthDate: Date;
};

export enum UserRole {
  User = "user",
  Developer = "developer",
  Admin = "admin",
}

export enum UserIdentityGender {
  Male = "male",
  Female = "female",
  NonBinary = "non-binary",
}

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

export enum UserFileType {
  Avatar = "avatar",
  Banner = "banner",
}

export type UserEndpoints =
  | Endpoint<
      "GET",
      "/users/search",
      PublicUser[],
      { q: string; limit?: number }
    >
  | Endpoint<"GET", "/users", User[]>
  | Endpoint<"GET", "/users/:userId", User>
  | Endpoint<"GET", "/users/@me", User>
  | Endpoint<
      "GET",
      "/users/check/:identifier",
      {
        exists: boolean;
        identifier: Partial<UserIdentifier>;
        suggestions?: string[];
      },
      { identifier: boolean; suggestions?: boolean }
    >
  | Endpoint<"PUT", "/users/:userId", User, UpdateUserDto>
  | Endpoint<"POST", "/users/:userId/files/:userFileType", string, FormData>
  | UserBookingEndpoints
  | UserNotificationEndpoints;
