import type { DeleteUserDto, UpdateUserDto } from "../../dtos";
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
  /** Set while a self-service deletion is pending its grace period. */
  deletionRequestedAt?: Date | null;
};

export type UserIdentifier = {
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  username: string;
};

/**
 * Returned when a user requests deletion of their account. The account enters
 * a grace period and is only anonymized once `scheduledAt` is reached.
 */
export type UserDeletionResponse = {
  requestedAt: Date;
  scheduledAt: Date;
};

/**
 * Reason a deletion request was rejected. Each blocker lists what the user must
 * resolve before the account can be deleted.
 */
export enum UserDeletionBlockerType {
  OrganizationMembership = "organization_membership",
  UpcomingBooking = "upcoming_booking",
  PendingRefundOrTransfer = "pending_refund_or_transfer",
}

/** Why the user is deleting their account (collected for retention analytics). */
export enum UserDeletionReason {
  NotUsing = "not_using",
  TooManyEmails = "too_many_emails",
  PrivacyConcerns = "privacy_concerns",
  FoundAlternative = "found_alternative",
  Other = "other",
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

export type UserOAuthProvider = Base & {
  provider: OAuth2Provider;
  providerId: string;
  displayName?: string;
  username?: string;
  email?: string;
  emailVerified: boolean;
  lastUsedAt?: Date;
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
  | Endpoint<"DELETE", "/users/~me", UserDeletionResponse, DeleteUserDto>
  | Endpoint<"POST", "/users/~me/restore", User>
  | Endpoint<"POST", "/users/@:userId/files/:userFileType", string, FormData>
  | Endpoint<"POST", "/users/files/:userFileType", string, FormData>
  | UserBookingEndpoints
  | UserNotificationEndpoints
  | UserPostEndpoints;
