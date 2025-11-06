import { ArrayOptions, ArrayResult } from "../..";
import { Endpoint } from "../../../endpoints";
import { UserProfile, UserProfileMetadata } from "../../profiles";

export type OrganizationCustomer = UserProfile & {
  email?: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: Date;
  metadata: OrganizationCustomerMetadata;
};

export type OrganizationCustomerMetadata = UserProfileMetadata & {
  bookingsCount: number;
  eventsAttendedCount: number;
  totalSpent: number;
  lastBookingAt?: Date;
};

export type OrganizationCustomersEndpoints =
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/customers",
      ArrayResult<OrganizationCustomer>,
      ArrayOptions<OrganizationCustomer>
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/customers/:username",
      OrganizationCustomer
    >;
