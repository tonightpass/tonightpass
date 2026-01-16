import type { UpdateUserDto } from "../../dtos";
import type { Endpoint } from "../../endpoints";
import type {
  Base,
  Currency,
  Language,
  Location,
  OAuth2Provider,
  UserBookingEndpoints,
  UserProfile,
} from "..";
import type { UserNotificationEndpoints } from "./notifications";
import type { UserPostEndpoints } from "./posts";

export * from "./bookings";
export * from "./customer";
export * from "./notifications";
export * from "./posts";
export * from "./tokens";

export type User = Base & {
  identifier: UserIdentifier;
  password?: string;
  identity: UserIdentity;
  role: UserRole;
  addresses: Location[];
  preferences: UserPreferences;
  connections: UserConnection[];
  oauthProviders: UserOAuthProvider[];
  isVerified: boolean;
  isOfficial: boolean;
};

export interface UserIdentifier {
  email?: string;
  phoneNumber?: string;
  username: string;
}

export type UserIdentity = UserProfile & {
  firstName: string;
  lastName: string;
  fullName: string;
  gender: UserIdentityGender;
  birthDate: Date;
  birthDateLastUpdatedAt?: Date;
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

export interface UserPreferences {
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
}

export interface UserConnection {
  ip: string;
  os: UserConnectionOS;
  device: UserConnectionDevice;
  client: UserConnectionClient;
  updatedAt: Date;
  createdAt: Date;
}

export type UserOAuthProvider = Base & {
  provider: OAuth2Provider;
  providerId: string;
  displayName?: string;
  username?: string;
  email?: string;
  emailVerified: boolean;
  lastUsedAt?: Date;
};

export interface UserConnectionOS {
  name: string;
  version: string;
}

export interface UserConnectionDevice {
  type: string;
  brand: string;
}

export interface UserConnectionClient {
  name: string;
  version: string;
}

export enum UserFileType {
  Avatar = "avatar",
  Banner = "banner",
}

export type UserEndpoints =
  | Endpoint<"GET", "/users", User[]>
  | Endpoint<"GET", "/users/@:userId", User>
  | Endpoint<"GET", "/users/~me", User>
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
  | Endpoint<"PUT", "/users/@:userId", User, UpdateUserDto>
  | Endpoint<"POST", "/users/@:userId/files/:userFileType", string, FormData>
  | Endpoint<"POST", "/users/files/:userFileType", string, FormData>
  | UserBookingEndpoints
  | UserNotificationEndpoints
  | UserPostEndpoints;
