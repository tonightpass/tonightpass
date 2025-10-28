---
"tonightpass": patch
---

Add OrganizationCustomer and OrganizationOrder types with SDK endpoints

- Added OrganizationCustomer type extending UserProfile with contact info (email, phoneNumber, firstName, lastName, fullName)
- Added OrganizationCustomerMetadata with customer statistics (bookingsCount, eventsAttendedCount, totalSpent, lastBookingAt)
- Renamed `user` field to `customer` in UserBooking type to use OrganizationCustomer
- Added OrganizationOrder type exposing customer as OrganizationCustomer instead of full User
- Fixed security issues: UserBooking and OrganizationOrder now expose OrganizationCustomer instead of full User object
- Added SDK methods: organizations.customers.getAll(), organizations.customers.get()
- Added SDK methods: organizations.orders.getAll(), organizations.orders.get(), organizations.orders.getAllByEvent()
- Added customer endpoints: GET /organizations/:organizationSlug/customers and GET /organizations/:organizationSlug/customers/:username
- Added order endpoints: GET /organizations/:organizationSlug/orders, GET /organizations/:organizationSlug/orders/:orderId, GET /organizations/:organizationSlug/events/:eventId/orders
