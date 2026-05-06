---
"tonightpass": patch
---

- Add bookings and participants endpoints to OrganizationOrdersEndpoints
- Add getBookingsByEvent and getParticipantsByEvent SDK methods
- Migrate SDK order methods to Query<> pattern (from positional args)
- Add optional id field to UpdateOrganizationEventTicketDto for sync by ID
