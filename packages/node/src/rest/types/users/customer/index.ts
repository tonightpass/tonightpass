import type { UserProfile, UserProfileMetadata } from "../../profiles";

export type UserCustomer = UserProfile & {
  email?: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  fullName: string;

  metadata: UserCustomerMetadata;
};

export type UserCustomerMetadata = UserProfileMetadata & {
  bookingsCount: number;
  eventsAttendedCount: number;
  totalSpent: number;
  lastBookingAt?: Date;
};
