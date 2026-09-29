---
"tonightpass": minor
---

Add the self-service event claim contract.

Scraped events are published on behalf of organisers who never opted in, and the
only way for one of them to take their event back was a `mailto:` on the contact
page. These endpoints let an organiser prove ownership through a code sent to
the email address scraped alongside their event, then move the event into one of
their organizations.

- `POST /organizations/@:organizationSlug/events/:eventSlug/claim` returns the
  masked address the code was sent to, and when it expires
- `POST /organizations/@:organizationSlug/events/:eventSlug/claim/confirm` takes
  the code and an optional target organization, and returns the claimed event
- `UserTokenType.EventClaim` backs the short-lived code

`OrganizationEvent` also declares `externalSource`, which the API has been
sending and both apps have been reading without it ever being part of the type.
