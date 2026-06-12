import {
  OrganizationEventLifecycleStatus,
  OrganizationEventStatus,
} from "./index";

export type OrganizationEventStatusInput = {
  lifecycleStatus?: OrganizationEventLifecycleStatus | null;
  startAt: Date | string;
  endAt: Date | string;
};

/**
 * Resolves the canonical {@link OrganizationEventStatus} for an event.
 *
 * Priority: a sticky lifecycle status (cancelled/postponed) overrides time-based
 * resolution. A rescheduled event falls back to temporal status once its new
 * startAt passes, so it can transition into Ongoing/Ended naturally.
 */
export function computeOrganizationEventStatus(
  event: OrganizationEventStatusInput,
  now: Date = new Date()
): OrganizationEventStatus {
  if (event.lifecycleStatus === OrganizationEventLifecycleStatus.Cancelled) {
    return OrganizationEventStatus.Cancelled;
  }
  if (event.lifecycleStatus === OrganizationEventLifecycleStatus.Postponed) {
    return OrganizationEventStatus.Postponed;
  }

  const startAt =
    event.startAt instanceof Date ? event.startAt : new Date(event.startAt);
  const endAt =
    event.endAt instanceof Date ? event.endAt : new Date(event.endAt);

  if (
    event.lifecycleStatus === OrganizationEventLifecycleStatus.Rescheduled &&
    now < startAt
  ) {
    return OrganizationEventStatus.Rescheduled;
  }

  if (startAt > now) {
    return OrganizationEventStatus.Upcoming;
  }
  if (startAt <= now && endAt >= now) {
    return OrganizationEventStatus.Ongoing;
  }
  return OrganizationEventStatus.Ended;
}
