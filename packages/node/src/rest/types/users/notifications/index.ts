import type { Endpoint } from "../../../endpoints";
import type { ArrayOptions, ArrayResult, Base, UserProfile } from "../..";

export enum UserNotificationType {
  Follow = "follow",
  // Ideas :
  // BookingConfirmation = "booking_confirmation",
  // EventReminder = "event_reminder",
  // EventReminderUpdated = "event_reminder_updated",
  // OrganizationInvite = "organization_invite",
  // OrganizationInviteAccepted = "organization_invite_accepted",
  // OrganizationInviteDeclined = "organization_invite_declined",
  // OrganizationInviteExpired = "organization_invite_expired",
  // OrganizationInviteResent = "organization_invite_resent",
  // OrganizationEventCreated = "organization_event_created",
  // OrganizationEventUpdated = "organization_event_updated",
  // OrganizationEventDeleted = "organization_event_deleted",
  // OrganizationEventStyleUpdated = "organization_event_style_updated",
  // OrganizationEventStyleDeleted = "organization_event_style_deleted",
  // OrganizationEventTicketCreated = "organization_event_ticket_created",
  // OrganizationEventTicketUpdated = "organization_event_ticket_updated",
}

export type UserNotificationBase = Base & {
  type: UserNotificationType.Follow;
  isSeen: boolean;
};

export type UserNotificationFollow = UserNotificationBase & {
  type: UserNotificationType.Follow;
  follower: UserProfile;
};

export type UserNotification = UserNotificationFollow;

export type UserNotificationEndpoints =
  | Endpoint<
      "GET",
      "/users/~me/notifications",
      ArrayResult<UserNotification>,
      ArrayOptions<UserNotification>
    >
  | Endpoint<
      "GET",
      "/users/~me/notifications/count",
      number,
      {
        unseen?: boolean;
      }
    >
  | Endpoint<"PUT", "/users/~me/notifications/read", void, undefined>;
