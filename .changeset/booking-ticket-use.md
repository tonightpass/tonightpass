---
"tonightpass": patch
---

Add ticket usage validation endpoint

- Add `PUT /users/bookings/tickets/:ticketId/use` endpoint to mark booking tickets as used
- Add `usersBookings.tickets.use()` method in SDK to increment ticket use count
- Enable ticket scanning and validation functionality for event organizers
