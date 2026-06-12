---
"tonightpass": patch
---

Add event lifecycle statuses (Cancelled, Postponed, Rescheduled).

- Extend `OrganizationEventStatus` with `Cancelled | Postponed | Rescheduled` (additive — existing consumers untouched).
- New enums: `OrganizationEventLifecycleStatus`, `OrganizationEventCancelledBy`, `OrderRefundStatus`.
- New `OrderTransferStatus.Cancelled` value for orders whose pending payout was cancelled by an event cancellation.
- New `OrganizationEvent` fields: `lifecycleStatus`, `cancelledAt`, `cancelledReason`, `cancelledBy`, `postponedAt`, `postponedReason`, `rescheduledFromAt`, `rescheduledFromEndAt`, `rescheduledAt`, `rescheduledReason`.
- New `Order` fields: `transferReversed`, `refundId`, `refundedAt`, `refundAmount`, `refundedFeeAmount`, `refundStatus`, `refundFailureReason`.
- New `UserBooking` fields: `cancelledAt`, `cancellationReason` (soft-cancel preserves the booking row for accounting / GDPR retention).
- New shared helper `computeOrganizationEventStatus(event, now?)` exported alongside `OrganizationEventStatusInput`. Resolves the canonical status with priority `Cancelled > Postponed > Rescheduled > temporal`.
- New DTOs `CancelOrganizationEventDto`, `PostponeOrganizationEventDto`, `RescheduleOrganizationEventDto`.
- New endpoints on `OrganizationEventEndpoints`:
  - `POST /organizations/@:organizationSlug/events/:eventSlug/cancel`
  - `POST /organizations/@:organizationSlug/events/:eventSlug/postpone`
  - `POST /organizations/@:organizationSlug/events/:eventSlug/reschedule`
  - `POST /organizations/@:organizationSlug/events/:eventSlug/reactivate`
- `UserNotificationType` extended with `OrganizationEventCancelled | OrganizationEventPostponed | OrganizationEventRescheduled`, with matching discriminated variants (`UserNotificationOrganizationEventCancelled`, etc.).
- `OrganizationNotificationType` values prefixed with `Organization` for consistency (`OrganizationMemberInvited`, `OrganizationMemberJoined`, `OrganizationMemberLeft`, `OrganizationMemberRoleUpdated`, `OrganizationEventCreated`, `OrganizationEventUpdated`, `OrganizationEventMilestone`). New values: `OrganizationEventCancelled`, `OrganizationEventPostponed`, `OrganizationEventRescheduled`, `OrganizationEventCancelRefundsCompleted`, `OrganizationEventCancelRefundsPartial`. **Breaking** for consumers that pattern-match on the old member/event names — translation files and notif renderers must be updated.

Refund policy enforced server-side: when an organizer cancels an event, attendees are refunded `total - fee` (service fees retained by TonightPass to cover Stripe processing costs). For Stripe Connect destination charges the transfer is reversed (`reverse_transfer: true`) so the organizer's balance is debited the amount it received; for pending transfers the payout is simply cancelled.
