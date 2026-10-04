import type { Endpoint } from "../../../../endpoints";

/** What the visitor gets back after saying they want to go. */
export type OrganizationEventInterest = {
  /** False when they had already pressed it, so the UI can stay quiet. */
  created: boolean;
  count: number;
};

export type CreateOrganizationEventInterestInput = {
  /** Optional: only when they ask to be told once tickets land here. */
  email?: string;
};

export type OrganizationEventInterestEndpoints = Endpoint<
  "POST",
  "/organizations/@:organizationSlug/events/:eventSlug/interests",
  OrganizationEventInterest,
  CreateOrganizationEventInterestInput
>;
