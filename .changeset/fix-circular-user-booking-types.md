---
"tonightpass": patch
---

Fix circular type reference in UserBookingTicket

- Added `UserBookingWithoutTickets` type to break circular reference between `UserBooking` and `UserBookingTicket`
- Updated `UserBookingTicket.booking` to use `UserBookingWithoutTickets` instead of full `UserBooking`
- This prevents "Maximum call stack size exceeded" errors in entity serialization
- Maintains type safety while eliminating circular dependencies