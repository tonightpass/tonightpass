import assert from "node:assert/strict";
import test from "node:test";

import {
  computeOrganizationEventStatus,
  OrganizationEventLifecycleStatus,
  OrganizationEventStatus,
} from "../../../../src";

export function organizationEventStatusTests() {
  const HOUR = 60 * 60 * 1000;
  const fixedNow = new Date("2026-06-01T12:00:00Z");
  const future = new Date(fixedNow.getTime() + 24 * HOUR);
  const futureEnd = new Date(future.getTime() + 4 * HOUR);
  const past = new Date(fixedNow.getTime() - 24 * HOUR);
  const pastEnd = new Date(past.getTime() + 4 * HOUR);

  test("computeOrganizationEventStatus - Upcoming when startAt is in the future", () => {
    assert.equal(
      computeOrganizationEventStatus(
        { startAt: future, endAt: futureEnd },
        fixedNow
      ),
      OrganizationEventStatus.Upcoming
    );
  });

  test("computeOrganizationEventStatus - Ongoing when between startAt and endAt", () => {
    assert.equal(
      computeOrganizationEventStatus(
        {
          startAt: new Date(fixedNow.getTime() - HOUR),
          endAt: new Date(fixedNow.getTime() + HOUR),
        },
        fixedNow
      ),
      OrganizationEventStatus.Ongoing
    );
  });

  test("computeOrganizationEventStatus - Ended when past endAt", () => {
    assert.equal(
      computeOrganizationEventStatus(
        { startAt: past, endAt: pastEnd },
        fixedNow
      ),
      OrganizationEventStatus.Ended
    );
  });

  test("computeOrganizationEventStatus - Cancelled overrides time-based status", () => {
    assert.equal(
      computeOrganizationEventStatus(
        {
          lifecycleStatus: OrganizationEventLifecycleStatus.Cancelled,
          startAt: future,
          endAt: futureEnd,
        },
        fixedNow
      ),
      OrganizationEventStatus.Cancelled
    );
    // Even past events stay Cancelled
    assert.equal(
      computeOrganizationEventStatus(
        {
          lifecycleStatus: OrganizationEventLifecycleStatus.Cancelled,
          startAt: past,
          endAt: pastEnd,
        },
        fixedNow
      ),
      OrganizationEventStatus.Cancelled
    );
  });

  test("computeOrganizationEventStatus - Postponed overrides time-based status", () => {
    assert.equal(
      computeOrganizationEventStatus(
        {
          lifecycleStatus: OrganizationEventLifecycleStatus.Postponed,
          startAt: future,
          endAt: futureEnd,
        },
        fixedNow
      ),
      OrganizationEventStatus.Postponed
    );
  });

  test("computeOrganizationEventStatus - Rescheduled before new startAt", () => {
    assert.equal(
      computeOrganizationEventStatus(
        {
          lifecycleStatus: OrganizationEventLifecycleStatus.Rescheduled,
          startAt: future,
          endAt: futureEnd,
        },
        fixedNow
      ),
      OrganizationEventStatus.Rescheduled
    );
  });

  test("computeOrganizationEventStatus - Rescheduled falls back to Ongoing after new startAt", () => {
    assert.equal(
      computeOrganizationEventStatus(
        {
          lifecycleStatus: OrganizationEventLifecycleStatus.Rescheduled,
          startAt: new Date(fixedNow.getTime() - HOUR),
          endAt: new Date(fixedNow.getTime() + HOUR),
        },
        fixedNow
      ),
      OrganizationEventStatus.Ongoing
    );
  });

  test("computeOrganizationEventStatus - Rescheduled falls back to Ended after new endAt", () => {
    assert.equal(
      computeOrganizationEventStatus(
        {
          lifecycleStatus: OrganizationEventLifecycleStatus.Rescheduled,
          startAt: past,
          endAt: pastEnd,
        },
        fixedNow
      ),
      OrganizationEventStatus.Ended
    );
  });

  test("computeOrganizationEventStatus - null lifecycleStatus uses temporal", () => {
    assert.equal(
      computeOrganizationEventStatus(
        { lifecycleStatus: null, startAt: future, endAt: futureEnd },
        fixedNow
      ),
      OrganizationEventStatus.Upcoming
    );
  });

  test("computeOrganizationEventStatus - accepts string dates", () => {
    assert.equal(
      computeOrganizationEventStatus(
        {
          startAt: future.toISOString(),
          endAt: futureEnd.toISOString(),
        },
        fixedNow
      ),
      OrganizationEventStatus.Upcoming
    );
  });
}
