import type { Endpoint } from "../../../endpoints";
import type { ArrayOptions, ArrayResult, Base, UserProfile } from "../..";

export enum OrganizationNotificationType {
  OrganizationCreated = "organization_created",
  Follow = "follow",
  OrganizationMemberInvited = "organization_member_invited",
  OrganizationMemberJoined = "organization_member_joined",
  OrganizationMemberLeft = "organization_member_left",
  OrganizationMemberRoleUpdated = "organization_member_role_updated",
  OrganizationEventCreated = "organization_event_created",
  OrganizationEventUpdated = "organization_event_updated",
  OrganizationEventCancelled = "organization_event_cancelled",
  OrganizationEventPostponed = "organization_event_postponed",
  OrganizationEventRescheduled = "organization_event_rescheduled",
  OrganizationEventCancelRefundsCompleted = "organization_event_cancel_refunds_completed",
  OrganizationEventCancelRefundsPartial = "organization_event_cancel_refunds_partial",
  OrganizationEventMilestone = "organization_event_milestone",
  OrderReceived = "order_received",
  PayoutCompleted = "payout_completed",
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
