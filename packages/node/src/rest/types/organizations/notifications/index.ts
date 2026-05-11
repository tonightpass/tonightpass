import type { Endpoint } from "../../../endpoints";
import type { ArrayOptions, ArrayResult, Base, UserProfile } from "../..";

export enum OrganizationNotificationType {
  OrganizationCreated = "organization_created",
  Follow = "follow",
  MemberInvited = "member_invited",
  MemberJoined = "member_joined",
  MemberLeft = "member_left",
  MemberRoleUpdated = "member_role_updated",
  EventCreated = "event_created",
  EventUpdated = "event_updated",
  OrderReceived = "order_received",
  PayoutCompleted = "payout_completed",
  EventMilestone = "event_milestone",
  BillingAccountConnected = "billing_account_connected",
}

export type OrganizationNotificationBase = Base & {
  type: OrganizationNotificationType;
  isSeen: boolean;
  message?: string;
  metadata?: Record<string, unknown>;
};

export type OrganizationNotificationWithActor = OrganizationNotificationBase & {
  actor?: UserProfile;
};

export type OrganizationNotification = OrganizationNotificationWithActor;

export type OrganizationNotificationEndpoints =
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/notifications",
      ArrayResult<OrganizationNotification>,
      ArrayOptions<OrganizationNotification>
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/notifications/count",
      number,
      {
        unseen?: boolean;
      }
    >
  | Endpoint<
      "PUT",
      "/organizations/@:organizationSlug/notifications/read",
      void,
      undefined
    >;
