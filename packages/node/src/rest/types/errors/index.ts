export enum ErrorType {
  // Auth
  AuthEmailAlreadyExists = "auth.email-already-exists",
  AuthUsernameAlreadyExists = "auth.username-already-exists",
  AuthPhoneNumberAlreadyExists = "auth.phone-number-already-exists",
  AuthInvalidCredentials = "auth.invalid-credentials",
  AuthUserNotFound = "auth.user-not-found",
  AuthInvalidToken = "auth.invalid-token",
  AuthTokenExpired = "auth.token-expired",
  AuthUnauthorized = "auth.unauthorized",
  AuthPasswordMismatch = "auth.password-mismatch",
  AuthInvalidOAuth2Provider = "auth.invalid-oauth2-provider",
  AuthOAuth2Error = "auth.oauth2-error",

  // Users
  UserNotFound = "user.not-found",
  UserInvalidUsername = "user.invalid-username",
  UserInvalidEmail = "user.invalid-email",
  UserInvalidPhoneNumber = "user.invalid-phone-number",
  UserInvalidPassword = "user.invalid-password",
  UserInvalidBirthDate = "user.invalid-birth-date",
  UserInvalidGender = "user.invalid-gender",
  UserInvalidRole = "user.invalid-role",
  UserInvalidPreferences = "user.invalid-preferences",
  UserInvalidLocation = "user.invalid-location",
  UserInvalidFile = "user.invalid-file",
  UserFileTooLarge = "user.file-too-large",
  UserUnsupportedFileType = "user.unsupported-file-type",

  // Organizations
  OrganizationNotFound = "organization.not-found",
  OrganizationInvalidSlug = "organization.invalid-slug",
  OrganizationInvalidName = "organization.invalid-name",
  OrganizationInvalidDescription = "organization.invalid-description",
  OrganizationInvalidLocation = "organization.invalid-location",
  OrganizationInvalidSocialLink = "organization.invalid-social-link",
  OrganizationAlreadyExists = "organization.already-exists",
  OrganizationUnauthorized = "organization.unauthorized",
  OrganizationMemberNotFound = "organization.member-not-found",
  OrganizationMemberInvalidRole = "organization.member-invalid-role",
  OrganizationMemberAlreadyExists = "organization.member-already-exists",

  // Events
  EventNotFound = "event.not-found",
  EventInvalidTitle = "event.invalid-title",
  EventInvalidDescription = "event.invalid-description",
  EventInvalidLocation = "event.invalid-location",
  EventInvalidDates = "event.invalid-dates",
  EventInvalidTickets = "event.invalid-tickets",
  EventInvalidStyles = "event.invalid-styles",
  EventInvalidType = "event.invalid-type",
  EventInvalidVisibility = "event.invalid-visibility",
  EventUnavailable = "event.unavailable",
  EventTicketNotFound = "event.ticket-not-found",
  EventTicketUnavailable = "event.ticket-unavailable",
  EventTicketInvalidQuantity = "event.ticket-invalid-quantity",

  // Orders
  OrderNotFound = "order.not-found",
  OrderInvalidStatus = "order.invalid-status",
  OrderInvalidPayment = "order.invalid-payment",
  OrderPaymentFailed = "order.payment-failed",
  OrderAlreadyPaid = "order.already-paid",
  OrderCancelled = "order.cancelled",
  OrderRefunded = "order.refunded",
  OrderExpired = "order.expired",

  // Bookings
  BookingNotFound = "booking.not-found",
  BookingInvalidStatus = "booking.invalid-status",
  BookingInvalidTickets = "booking.invalid-tickets",
  BookingTicketNotFound = "booking.ticket-not-found",
  BookingTicketInvalidToken = "booking.ticket-invalid-token",
  BookingTicketExpired = "booking.ticket-expired",
  BookingTicketUsed = "booking.ticket-used",

  // Files
  FileNotFound = "file.not-found",
  FileInvalidType = "file.invalid-type",
  FileTooLarge = "file.too-large",
  FileUploadFailed = "file.upload-failed",

  // General
  ValidationError = "validation.error",
  DatabaseError = "database.error",
  InternalServerError = "server.internal-error",
  NotFound = "not-found",
  BadRequest = "bad-request",
  Unauthorized = "unauthorized",
  Forbidden = "forbidden",
  TooManyRequests = "too-many-requests",
  ServiceUnavailable = "service-unavailable",

  // Rate Limiting
  TooManyRequestsAuth = "rate-limit.auth",
  TooManyRequestsApi = "rate-limit.api",

  // Webhooks
  WebhookInvalidSignature = "webhook.invalid-signature",
  WebhookInvalidEvent = "webhook.invalid-event",
  WebhookProcessingFailed = "webhook.processing-failed",

  // Payments/Billing
  PaymentRequired = "payment.required",
  PaymentMethodRequired = "payment.method-required",
  PaymentFailed = "payment.failed",
  PaymentCancelled = "payment.cancelled",
  PaymentRefunded = "payment.refunded",
  BillingInvalidAccount = "billing.invalid-account",
  BillingAccountRequired = "billing.account-required",

  // Notifications
  NotificationInvalidType = "notification.invalid-type",
  NotificationSendingFailed = "notification.sending-failed",

  // Cache
  CacheError = "cache.error",
  CacheMiss = "cache.miss",

  // External Services
  ExternalServiceError = "external-service.error",
  ExternalServiceTimeout = "external-service.timeout",
  ExternalServiceUnavailable = "external-service.unavailable",
}
