# tonightpass

## 0.0.233

### Patch Changes

- [`bb9a656`](https://github.com/tonightpass/tonightpass/commit/bb9a656a826c726119ff7a6828f214c71b11544a) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix Content-Type header handling for empty body requests. Previously, the `Content-Type: application/json` header was set as a default header on all requests, causing Fastify to throw "Body cannot be empty when content-type is set to 'application/json'" error for POST/DELETE requests without a body. Now the Content-Type header is only set dynamically in transformRequest when there is actual JSON data to send.

## 0.0.232

### Patch Changes

- [`9ca593d`](https://github.com/tonightpass/tonightpass/commit/9ca593d86b2c22863ddee7e733fec94a3833e4eb) Thanks [@antoinekm](https://github.com/antoinekm)! - Replace `null` with `undefined` for empty body parameters in SDK calls and endpoint types to prevent API errors when Content-Type header is set

## 0.0.231

### Patch Changes

- [`08659fe`](https://github.com/tonightpass/tonightpass/commit/08659fee1bc1fd002ac35c679a26040d9b516cba) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix PUT and DELETE requests with empty body causing "Body cannot be empty when content-type is set to 'application/json'" error. Changed body from `undefined` to `null` for endpoints that don't require a request body.

## 0.0.230

### Patch Changes

- [`0186224`](https://github.com/tonightpass/tonightpass/commit/01862249aa694abd7986b2b3ec14eb557f09982b) Thanks [@antoinekm](https://github.com/antoinekm)! - Add Bearer token authentication support to SDK
  - Add `accessToken` option to `ClientOptions`
  - Add `setAccessToken()` method to `Client` class for dynamic token updates
  - Automatically include `Authorization: Bearer <token>` header in requests when accessToken is set
  - Update `/auth/refresh-token` endpoint type to return `AuthResponse` instead of `null`
  - Remove redundant `setAccessToken` helper from React hooks (use `client.setAccessToken()` directly)

## 0.0.229

### Patch Changes

- [`dd50392`](https://github.com/tonightpass/tonightpass/commit/dd5039269ac74ae7cad236a3376cd432c8e8ee49) Thanks [@antoinekm](https://github.com/antoinekm)! - Add AuthResponse type for mobile authentication support
  - Added new `AuthResponse` type that includes user data and authentication tokens (accessToken and refreshToken)
  - Updated `/auth/sign-in` and `/auth/sign-up` endpoints to return `AuthResponse` instead of `User`
  - Updated Google OAuth one-tap endpoint to return `AuthResponse`
  - Tokens are now included in the response body for mobile clients while continuing to be set as cookies for web browsers
  - This change enables React Native apps to extract and store tokens from the API response

  This is a breaking change for clients consuming the sign-in/sign-up endpoints, as the response structure has changed from:

  ```typescript
  { success: true, data: User }
  ```

  to:

  ```typescript
  { success: true, data: { user: User, accessToken: string, refreshToken: string } }
  ```

  Web clients using cookies for authentication are unaffected as tokens continue to be set via Set-Cookie headers.

## 0.0.228

### Patch Changes

- [`15672ac`](https://github.com/tonightpass/tonightpass/commit/15672ac3cdbd49fed54fa8bb21399addfa01a046) Thanks [@antoinekm](https://github.com/antoinekm)! - Add FileObject type support for file uploads to work with both web and mobile platforms

## 0.0.227

### Patch Changes

- [`8cb97b1`](https://github.com/tonightpass/tonightpass/commit/8cb97b1bc2b018230f832104726be5c421b8b466) Thanks [@antoinekm](https://github.com/antoinekm)! - Change OAuth2 connect method to return URL instead of auto-redirecting for React Native compatibility

## 0.0.226

### Patch Changes

- [`ac1c979`](https://github.com/tonightpass/tonightpass/commit/ac1c9791e6964b9248135120bffb37301ba74860) Thanks [@antoinekm](https://github.com/antoinekm)! - Replace Node.js WebSocket client with browser/React Native compatible version
  - Remove dependency on `ws` package (Node.js only)
  - Use native WebSocket API for browser and React Native compatibility
  - Pass authentication token via WebSocket subprotocol (`access_token.*`) instead of custom headers
  - Change build platform from "node" to "neutral" for universal compatibility
  - Remove React Native specific build files (single universal build)

## 0.0.225

### Patch Changes

- [`9fb733c`](https://github.com/tonightpass/tonightpass/commit/9fb733c53cb38e7fb0d9103716ad88c77e066657) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix birthDate transformation in UpdateUserDto to prevent empty object serialization

## 0.0.224

### Patch Changes

- [`2d8f4a9`](https://github.com/tonightpass/tonightpass/commit/2d8f4a93c472b35dd21d5ac29e6266267e9ec5dc) Thanks [@antoinekm](https://github.com/antoinekm)! - Add birthDateLastUpdatedAt field to UserIdentity to track birth date updates and enforce yearly update limit

## 0.0.223

### Patch Changes

- [`b4a4670`](https://github.com/tonightpass/tonightpass/commit/b4a4670c868d56d27904de3da2af9e4ee4a031b6) Thanks [@antoinekm](https://github.com/antoinekm)! - Breaking: Migrate route patterns to use @ for identifiers and ~ for contextual routes
  - Changed `/users/:username` to `/users/@:username`
  - Changed `/organizations/:organizationSlug` to `/organizations/@:organizationSlug`
  - Changed `/profiles/:username` to `/profiles/@:username`
  - Changed `/users/@me` to `/users/~me`
  - Changed `/channels/@me` to `/channels/~me`
  - Changed `/organizations/:organizationSlug/members/@me` to `/organizations/@:organizationSlug/members/~me`

  This change prevents route collisions between user slugs and static routes (e.g., a user named "events" no longer conflicts with `/organizations/events`). The `@` prefix clearly indicates public identifiers while `~` indicates contextual/self routes.

## 0.0.222

### Patch Changes

- [`5620ea0`](https://github.com/tonightpass/tonightpass/commit/5620ea0166a361373ebdd2ec3d994c9b60751a07) Thanks [@antoinekm](https://github.com/antoinekm)! - Add role hierarchy utilities and constants
  - Add `OrganizationMemberRolePower` and `UserRolePower` constants to define role hierarchy
  - Add `isMemberRoleAtLeast()` utility function to check if a member role has at least the specified minimum role level
  - Export role constants from package for use in both frontend and backend

## 0.0.221

### Patch Changes

- [`0f85375`](https://github.com/tonightpass/tonightpass/commit/0f8537573b228b1024365d7f69d5c8d3a9658d13) Thanks [@antoinekm](https://github.com/antoinekm)! - Add birthDate field to OrganizationCustomer type to display customer age

## 0.0.220

### Patch Changes

- [`44b602f`](https://github.com/tonightpass/tonightpass/commit/44b602f079cdbd23fba35575b7713ca1f81dbfac) Thanks [@antoinekm](https://github.com/antoinekm)! - Change Order user field from User to UserProfile for better security
  - Changed `Order.user` from `User` to `UserProfile` to only expose public user information
  - Prepares for future multi-user payment system where users should only see public profiles

## 0.0.219

### Patch Changes

- [`e415c6c`](https://github.com/tonightpass/tonightpass/commit/e415c6c0ac28d430ee979443237e57d4a3dfcddb) Thanks [@antoinekm](https://github.com/antoinekm)! - Add OrganizationCustomer and OrganizationOrder types with SDK endpoints
  - Added OrganizationCustomer type extending UserProfile with contact info (email, phoneNumber, firstName, lastName, fullName)
  - Added OrganizationCustomerMetadata with customer statistics (bookingsCount, eventsAttendedCount, totalSpent, lastBookingAt)
  - Renamed `user` field to `customer` in UserBooking type to use OrganizationCustomer
  - Added OrganizationOrder type exposing customer as OrganizationCustomer instead of full User
  - Fixed security issues: UserBooking and OrganizationOrder now expose OrganizationCustomer instead of full User object
  - Added SDK methods: organizations.customers.getAll(), organizations.customers.get()
  - Added SDK methods: organizations.orders.getAll(), organizations.orders.get(), organizations.orders.getAllByEvent()
  - Added customer endpoints: GET /organizations/:organizationSlug/customers and GET /organizations/:organizationSlug/customers/:username
  - Added order endpoints: GET /organizations/:organizationSlug/orders, GET /organizations/:organizationSlug/orders/:orderId, GET /organizations/:organizationSlug/events/:eventId/orders

## 0.0.218

### Patch Changes

- [`0c768fd`](https://github.com/tonightpass/tonightpass/commit/0c768fd4c431f242cd0d790a7b78238a4f0ad000) Thanks [@antoinekm](https://github.com/antoinekm)! - Add `UserCustomer` type for organization access to customer information. This new type extends `UserProfile` and includes additional private information (email, phone, firstName, lastName) and customer statistics (bookingsCount, eventsAttendedCount, totalSpent, lastBookingAt) that are useful for event organizers.

## 0.0.217

### Patch Changes

- [`e48e006`](https://github.com/tonightpass/tonightpass/commit/e48e0064a3903651161f7f4ba5f3b56834fe1d59) Thanks [@antoinekm](https://github.com/antoinekm)! - Refactor booking tickets into separate files for better code organization. Split ticket types and SDK functions into dedicated files under `users/bookings/tickets/` while maintaining backward compatibility through re-exports.

## 0.0.216

### Patch Changes

- [`b0d35af`](https://github.com/tonightpass/tonightpass/commit/b0d35af07f06b538e9aae9c1096419589366f2ad) Thanks [@antoinekm](https://github.com/antoinekm)! - Add ticket usage validation endpoint
  - Add `PUT /users/bookings/tickets/:ticketId/use` endpoint to mark booking tickets as used
  - Add `usersBookings.tickets.use()` method in SDK to increment ticket use count
  - Enable ticket scanning and validation functionality for event organizers

## 0.0.215

### Patch Changes

- [`7e11048`](https://github.com/tonightpass/tonightpass/commit/7e1104835c1eb6ee34c060500d83e8accf8f68ce) Thanks [@antoinekm](https://github.com/antoinekm)! - Add AuthMethod type for authentication method tracking (OAuth2Provider | "password" | null)

- [`205b9c3`](https://github.com/tonightpass/tonightpass/commit/205b9c39edd8bc6412c72c856fb96e809848f16a) Thanks [@antoinekm](https://github.com/antoinekm)! - Remove TikTok OAuth provider from OAuth2Provider enum

## 0.0.214

### Patch Changes

- [`fbd2a2e`](https://github.com/tonightpass/tonightpass/commit/fbd2a2efce4b05ee5c52427d3874226132021610) Thanks [@antoinekm](https://github.com/antoinekm)! - Add TikTok OAuth provider and remove deprecated Apple provider from OAuth2Provider enum

## 0.0.213

### Patch Changes

- [`b96a343`](https://github.com/tonightpass/tonightpass/commit/b96a34368d4e09ad17fa600607fe11f42286472c) Thanks [@antoinekm](https://github.com/antoinekm)! - Add calendar endpoint for events grouped by date

## 0.0.212

### Patch Changes

- [`fb813d7`](https://github.com/tonightpass/tonightpass/commit/fb813d7b78025f778a3b160bc367f815d2fcb047) Thanks [@antoinekm](https://github.com/antoinekm)! - Move Google One Tap authentication to OAuth2 endpoint `/oauth2/google/one-tap` and update SDK to `tnp.auth.oauth2.googleOneTap()`

## 0.0.211

### Patch Changes

- [`9330cc8`](https://github.com/tonightpass/tonightpass/commit/9330cc84150bec31f61a0cc11f1fd177fe57da90) Thanks [@antoinekm](https://github.com/antoinekm)! - Add Google One Tap authentication support with new `/auth/google-one-tap` endpoint and `GoogleOneTapDto`

## 0.0.210

### Patch Changes

- [`521193d`](https://github.com/tonightpass/tonightpass/commit/521193df5daef8998d181cd20f8cc952234028d5) Thanks [@antoinekm](https://github.com/antoinekm)! - Add search and list endpoints for profiles and events
  - Add `profiles.getAll()` method to list all profiles with pagination support
  - Add `profiles.search(query, options?)` method to search profiles with pagination support
  - Update `organizations.events.search()` to support full pagination options instead of just limit
  - Add proper TypeScript types for all new endpoints (`SearchProfilesOptions`, `SearchOrganizationEventsOptions`)
  - All search endpoints now return `ArrayResult` with consistent pagination support

## 0.0.209

### Patch Changes

- [`591a33c`](https://github.com/tonightpass/tonightpass/commit/591a33cba93c5f1b4e626914ab89d43dc1d30e90) Thanks [@antoinekm](https://github.com/antoinekm)! - Add in-memory cache support to the REST client
  - Add `CacheManager` class for managing HTTP request cache
  - Add `cache` option to `ClientOptions` with configurable TTL and methods
  - Cache GET requests by default to reduce API calls during build time
  - Add `clearCache()` and `getCacheStats()` methods to Client

## 0.0.208

### Patch Changes

- [`d00776d`](https://github.com/tonightpass/tonightpass/commit/d00776da94e47cfe7fb0acbf8da331187572d673) Thanks [@antoinekm](https://github.com/antoinekm)! - Add parameterized OAuth2 route types alongside existing hardcoded routes for better flexibility in API client implementations

## 0.0.207

### Patch Changes

- [`e48632b`](https://github.com/tonightpass/tonightpass/commit/e48632b8b1ea9f0ce8f4ae59fe19bb0454e3425d) Thanks [@antoinekm](https://github.com/antoinekm)! - Add OAuth provider types and improve authentication system
  - Added `UserOAuthProvider` type to properly track OAuth connections with metadata
  - Added `OAuth2Provider` enum with CamelCase values (Google, Facebook, Apple, Twitter)
  - Removed legacy OAuth provider fields from `UserIdentifier` (google, facebook, apple, twitter)
  - Added generic OAuth2 endpoints with provider parameters to reduce duplication
  - Added `OAuth2ProviderParams` type for endpoint parameter typing
  - OAuth providers now stored in `oauthProviders` array on User type with full metadata including:
    - provider (enum)
    - providerId (unique ID from provider)
    - displayName
    - username
    - email
    - emailVerified
    - lastUsedAt

## 0.0.206

### Patch Changes

- [`0cf8d2b`](https://github.com/tonightpass/tonightpass/commit/0cf8d2b85181f9f8acb071e3fb35ef3017472ae0) Thanks [@antoinekm](https://github.com/antoinekm)! - Remove debug console logs from HTTP client

  Cleaned up transformRequest function by removing temporary debug console.log statements that were added during FormData header troubleshooting. The FormData handling functionality remains intact while removing unnecessary logging.

## 0.0.205

### Patch Changes

- [`bfae930`](https://github.com/tonightpass/tonightpass/commit/bfae9307d5761e8b6d2d41dc752c9a13aed86f1e) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix FormData Content-Type header handling with normalized headers

  Improved FormData upload handling in the HTTP client by normalizing all header keys to lowercase and properly removing content-type headers. This ensures that FormData requests allow the browser to set the correct multipart/form-data Content-Type with proper boundaries, fixing file upload issues that were causing JSON parsing errors.

## 0.0.204

### Patch Changes

- [`292ef9b`](https://github.com/tonightpass/tonightpass/commit/292ef9bc7e969f706a942c900e296a6656d3293f) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix FormData upload handling in HTTP client

  Fixed an issue where FormData uploads were failing due to incorrect Content-Type header management. The transformRequest function now properly handles the Content-Type header by only setting it to "application/json" for non-FormData requests, allowing the browser to automatically set the correct multipart/form-data Content-Type with proper boundaries for file uploads.

## 0.0.203

### Patch Changes

- [`178b792`](https://github.com/tonightpass/tonightpass/commit/178b7929d33db9dc08f9397ea67365b9e588447d) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix notifications read endpoint body parameter
  - Change body parameter from `undefined` to `null` in notifications

## 0.0.202

### Patch Changes

- [`3bafc16`](https://github.com/tonightpass/tonightpass/commit/3bafc1658b91186e603b62bb6e2cdfb2d70a8e40) Thanks [@antoinekm](https://github.com/antoinekm)! - Add automatic mark as read functionality for notifications
  - Add new PUT endpoint `/users/@me/notifications/read` to mark all user notifications as read
  - Add `read` method to `usersNotifications` SDK

## 0.0.201

### Patch Changes

- [`db99f1d`](https://github.com/tonightpass/tonightpass/commit/db99f1d3b8255418e13a5a6af7b36378d0bc1ccb) Thanks [@antoinekm](https://github.com/antoinekm)! - Remove tier field from CreateApiKeyDto and UpdateApiKeyDto for security

  API key tiers will now be managed manually through direct database operations instead of being user-controllable through the API. This prevents users from escalating their API key privileges.

## 0.0.200

### Patch Changes

- [`c5e18b7`](https://github.com/tonightpass/tonightpass/commit/c5e18b77eb037cf3e743d61f04253c807fd8e93f) Thanks [@antoinekm](https://github.com/antoinekm)! - Add API key support to TonightPass SDK
  - Add optional `apiKey` parameter to `ClientOptions`
  - Automatically inject `X-API-Key` header when API key is provided
  - Maintain backward compatibility with existing code

## 0.0.199

### Patch Changes

- [`497717a`](https://github.com/tonightpass/tonightpass/commit/497717a70bfda735ac18d580812ebd8723e1996d) Thanks [@antoinekm](https://github.com/antoinekm)! - Add validation error messages for regex patterns in DTOs

  Added translatable error messages for regex validations in DTOs:
  - user.username.format for user username validations
  - organization.slug.format for organization slug validations
  - organization.event.slug.format for organization event slug validations
  - user.avatar.url.invalid for user avatar URL validations
  - organization.avatar.url.invalid for organization avatar URL validations
  - organization.banner.url.invalid for organization banner URL validations
  - organization.event.flyers.url.invalid for organization event flyer URL validations
  - organization.event.trailers.url.invalid for organization event trailer URL validations

## 0.0.198

### Patch Changes

- [`b823be8`](https://github.com/tonightpass/tonightpass/commit/b823be8d08f2b4b1d82c6aec632cc967a8349508) Thanks [@antoinekm](https://github.com/antoinekm)! - - Remove ApartmentParty from OrganizationEventType enum (not commonly used in English)

## 0.0.197

### Patch Changes

- [`c2a5839`](https://github.com/tonightpass/tonightpass/commit/c2a583955c814bf28144b09f6e2be0c5fb9c5a3d) Thanks [@antoinekm](https://github.com/antoinekm)! - Add new event types: House Party, Apartment Party, and Friends Party
  - Add HouseParty, ApartmentParty, and FriendsParty to OrganizationEventType enum
  - These new types support more intimate and private event categories

## 0.0.196

### Patch Changes

- [`47489cf`](https://github.com/tonightpass/tonightpass/commit/47489cf8de944ac4298fb4fb259be4a569089c3d) Thanks [@antoinekm](https://github.com/antoinekm)! - Add types and styles filtering support to OrganizationEventArrayOptions
  - Add `types` parameter to filter events by OrganizationEventType
  - Add `styles` parameter to filter events by style IDs or slugs
  - Update `/organizations/events` endpoint to use OrganizationEventArrayOptions
  - Support both single values and arrays for filtering parameters

## 0.0.195

### Patch Changes

- [`67ea74b`](https://github.com/tonightpass/tonightpass/commit/67ea74b3ae0e69a5e3ffab38ab1aa9f29b6848ac) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix posts views SDK method not being properly initialized with client

## 0.0.194

### Patch Changes

- [`1bcac3b`](https://github.com/tonightpass/tonightpass/commit/1bcac3b5ebb3240d033fcc509afd01ef073d9d07) Thanks [@antoinekm](https://github.com/antoinekm)! - Add feed types and SDK methods for following and discover feeds with mixed UserPost and OrganizationEvent content

## 0.0.193

### Patch Changes

- [`0951efa`](https://github.com/tonightpass/tonightpass/commit/0951efa494c4619d52ce875841680f22cb471c4f) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix TypeScript errors in posts SDK
  - Fix incorrect imports for CreateUserPostCommentDto and UpdateUserPostCommentDto in comments SDK
  - Fix incorrect imports for CreateUserPostRepostDto in reposts SDK
  - Fix incorrect imports for CreateUserPostDto and UpdateUserPostDto in main posts SDK
  - Fix incorrect URL endpoints in reposts SDK (/repost -> /reposts)
  - Fix incorrect delete method signatures (missing undefined parameter for request body)
  - Reorganize imports to follow ESLint rules

## 0.0.192

### Patch Changes

- [`0315e2f`](https://github.com/tonightpass/tonightpass/commit/0315e2f41ce8056142f5b6d604bf5c898cba303a) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix user post media upload endpoint return type
  - Change `/users/@me/posts/media` endpoint to return a string (URL) instead of UserPostMedia object
  - This endpoint uploads media temporarily and returns the CDN URL for later use in post creation

## 0.0.191

### Patch Changes

- [`1281a2c`](https://github.com/tonightpass/tonightpass/commit/1281a2ccbb21a71e037cac3a063c1ca671deb03b) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix DTO array validation to use proper decorators
  - Replace `@Length` with `@ArrayMaxSize` for array size validation in DTOs
  - `mediaUrls` in CreateUserPostDto now uses `@ArrayMinSize(1)` and `@ArrayMaxSize(10)` instead of `@Length(1, 10)`
  - `links` arrays in user and organization DTOs now use `@ArrayMaxSize(5)` instead of `@Length(0, 5)`
  - Add `@ArrayMaxSize(25)` limits to flyers and trailers in organization event DTOs

  This ensures proper validation of array sizes rather than individual element lengths.

## 0.0.190

### Patch Changes

- [`2a31072`](https://github.com/tonightpass/tonightpass/commit/2a3107254c0367a33e4bffbbd76c2494fe51f301) Thanks [@antoinekm](https://github.com/antoinekm)! - Update CreateUserPostDto to require at least 1 media
  - Changed mediaIds validation from `@Length(0, 10)` to `@Length(1, 10)`
  - Posts now require at least 1 media (photo or video)
  - Content remains optional
  - Maximum of 10 media items per post

## 0.0.189

### Patch Changes

- [`d9d6414`](https://github.com/tonightpass/tonightpass/commit/d9d641461dd6b994081e717fc3aac4c6e0b15178) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix UserPostEndpoints to include all sub-resource endpoints (comments, reposts, views, media)

- [`d155466`](https://github.com/tonightpass/tonightpass/commit/d1554664a4b7316532152b72db713eee6cd9116d) Thanks [@antoinekm](https://github.com/antoinekm)! - Add organized views system for user posts following events pattern
  - Create `src/sdk/users/posts/views/index.ts` with `usersPostsViews` SDK module
  - Create `src/rest/types/users/posts/views/index.ts` with `UserPostViewEndpoints` types
  - Refactor user posts SDK to use `views: usersPostsViews(client)` instead of `addView`
  - Add `UserPostViewEndpoints` to main `UserEndpoints` type union
  - Export views types from user posts index
  - Remove views endpoint from `UserPostEndpoints` to separate module

  Now user posts views follow the same organized pattern as events:
  - Events: `sdk.organizations.events.views.record(orgSlug, eventSlug)`
  - Posts: `sdk.users.posts.views.record(username, postId)`

## 0.0.188

### Patch Changes

- [`4f991ee`](https://github.com/tonightpass/tonightpass/commit/4f991eed5a6dc1e6b3ff0aa1fbcee8345d5ab473) Thanks [@antoinekm](https://github.com/antoinekm)! - Refactor user posts DTOs organization and validation

  **Breaking Changes:**
  - Moved all user posts DTOs from `/rest/types/` to `/rest/dtos/` following proper separation of concerns
  - Converted type definitions to class-validator classes for better runtime validation

  **New Structure:**
  - `CreateUserPostDto`, `UpdateUserPostDto` → `/rest/dtos/users/posts/`
  - `CreateUserPostCommentDto`, `UpdateUserPostCommentDto` → `/rest/dtos/users/posts/comments/`
  - `CreateUserPostRepostDto` → `/rest/dtos/users/posts/reposts/`

  **Validation Improvements:**
  - Added proper string length limits (posts: 1-500 chars, comments/reposts: 1-280 chars)
  - Added array size validation for media IDs (0-10 items max)
  - Enhanced type safety with class-validator decorators

  **Code Organization:**
  - Split large type files into focused modules (posts, comments, reposts, media)
  - Improved import paths and module exports
  - Better separation between DTOs (data transfer) and types (domain models)

## 0.0.187

### Patch Changes

- [`21cb49b`](https://github.com/tonightpass/tonightpass/commit/21cb49b520709ee1223c5d93193d24dc1fa3aa72) Thanks [@antoinekm](https://github.com/antoinekm)! - Add user posts, reposts and comments types and SDK
  - Add UserPost, UserPostRepost, UserPostComment types with social media architecture
  - Add UserPostMedia with AI-generated descriptions and NSFW flagging support
  - Add complete DTOs for creating and updating posts, comments, and reposts
  - Add comprehensive SDK methods for posts, comments, and reposts management
  - Add endpoints for posts (/users/:username/posts) and reposts (/users/:username/reposts) separation
  - Add media upload endpoint with pre-processing support
  - Add view tracking similar to organization events

## 0.0.186

### Patch Changes

- [`0c5502a`](https://github.com/tonightpass/tonightpass/commit/0c5502af120f59d98f77e6fe0c1ee3500141f196) Thanks [@antoinekm](https://github.com/antoinekm)! - Add maximum 5 links validation for user and organization DTOs
  - Added `@Length(0, 5)` validation to user and organization links fields
  - Updated validation messages to use proper error handling
  - Ensures consistent limits across user profiles and organizations

## 0.0.185

### Patch Changes

- [`b8e4d4c`](https://github.com/tonightpass/tonightpass/commit/b8e4d4cf7cad42d0da6b890377bdaeef18011827) Thanks [@antoinekm](https://github.com/antoinekm)! - **BREAKING CHANGE**: Refactored social links structure with URL validation
  - Removed `OrganizationSocialLink` type and `OrganizationSocialType` enum
  - Removed `socialLinks` property from `OrganizationIdentity`
  - Added `links: string[]` property to `BaseProfile` (available for both Users and Organizations)
  - Updated DTOs with URL validation:
    - `UpdateOrganizationIdentityDto`: Changed `socialLinks?: OrganizationSocialLink[]` to `links?: string[]` with `@IsUrl({}, { each: true })`
    - `CreateOrganizationIdentityDto`: Changed `socialLinks?: OrganizationSocialLink[]` to `links?: string[]` with `@IsUrl({}, { each: true })`
    - `UpdateUserIdentityDto`: Added `links?: string[]` with `@IsUrl({}, { each: true })`
    - `CreateUserIdentityDto`: Added `links?: string[]` with `@IsUrl({}, { each: true })`

  Migration guide:
  - Replace `organization.identity.socialLinks` with `organization.identity.links`
  - Replace `user.identity.socialLinks` with `user.identity.links`
  - Remove type information from links - detection should be done on frontend based on URL patterns
  - Links are now simple string arrays containing URLs with proper URL validation
  - All links must be valid URLs (enforced by @IsUrl validator)

## 0.0.184

### Patch Changes

- [`18addee`](https://github.com/tonightpass/tonightpass/commit/18addeefc25e4c2ab39e95c3f9ce3728045c669e) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix CreateUserDto validation to allow temporary avatar URLs during signup

## 0.0.183

### Patch Changes

- [`097d233`](https://github.com/tonightpass/tonightpass/commit/097d2337047b9fb50b7075e61df9f14ad355f202) Thanks [@antoinekm](https://github.com/antoinekm)! - Add temporary file upload support for user avatars during signup
  - Added `/users/files/:userFileType` endpoint for uploading temporary files
  - Added `uploadTempFile` method to users SDK for handling temporary avatar uploads

## 0.0.182

### Patch Changes

- [`e0d988e`](https://github.com/tonightpass/tonightpass/commit/e0d988e92c33adebefcac7266eeef6f3e58414c5) Thanks [@antoinekm](https://github.com/antoinekm)! - Add organization file upload support
  - Add `OrganizationFileType` enum with Avatar and Banner types
  - Add organization file upload endpoint and SDK method

## 0.0.181

### Patch Changes

- [`93ace63`](https://github.com/tonightpass/tonightpass/commit/93ace63d4121918b912c32b156797fd3e2a760c1) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix password validation consistency in UpdateUserDto

  Add missing password complexity validation rules to UpdateUserDto to match CreateUserDto security requirements. Now both DTOs enforce the same password rules: minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number or special character.

## 0.0.180

### Patch Changes

- [`cc9039d`](https://github.com/tonightpass/tonightpass/commit/cc9039da00d2454f1f8ce2a979c7ad24b80477a6) Thanks [@antoinekm](https://github.com/antoinekm)! - Add WebSocket support for real-time communication
  - Add WebSocket client with typed endpoints and auto-reconnection
  - Add React hook useWebSocket for WebSocket subscriptions with SWR
  - Rename hook files to kebab-case for consistency
  - Support all WebSocket paths with strict TypeScript typing

## 0.0.179

### Patch Changes

- [`308d691`](https://github.com/tonightpass/tonightpass/commit/308d6911538085d21dc475cd3122e0fa9b0a355c) Thanks [@antoinekm](https://github.com/antoinekm)! - Add currencies support to TonightPass SDK
  - Added currencies module to TonightPass class
  - Exposed currencies API endpoints (getRates, convert, convertAmount)
  - Added proper TypeScript types for currency operations
  - Fixed missing currencies export in SDK

## 0.0.178

### Patch Changes

- [`0842dfb`](https://github.com/tonightpass/tonightpass/commit/0842dfb5ebb301069c52cd88a6131b65653cc8e0) Thanks [@antoinekm](https://github.com/antoinekm)! - Add status filter parameter to organization events endpoint
  - Added optional `status` parameter to `/organizations/:organizationSlug/events` endpoint to filter events by their status (Upcoming, Ongoing, Ended)
  - The parameter accepts either a single `OrganizationEventStatus` value or an array of statuses for multiple status filtering

## 0.0.177

### Patch Changes

- [`44d502a`](https://github.com/tonightpass/tonightpass/commit/44d502a735be00d6b3796f5c6537ca851d7e907c) Thanks [@antoinekm](https://github.com/antoinekm)! - Add organization analytics endpoints for dashboard MVP
  - Add OrganizationAnalyticsOverview type with metrics and chart data
  - Add OrganizationEventAnalytics type with basic event metrics
  - Add analytics endpoints:
    - GET /organizations/:organizationSlug/analytics/overview
    - GET /organizations/:organizationSlug/analytics/events
  - Add AnalyticsOptions and EventAnalyticsOptions query parameters
  - Support for period filtering (7d, 30d, 90d, 12m) and custom date ranges

## 0.0.176

### Patch Changes

- [`1c92b58`](https://github.com/tonightpass/tonightpass/commit/1c92b58ba0750f1ca03215c0ffc84d36c076a5f0) Thanks [@antoinekm](https://github.com/antoinekm)! - Add vatRate field to OrganizationBilling type

  This adds a new `vatRate` field to the `OrganizationBilling` type to support organization-specific VAT rates for billing calculations.

## 0.0.175

### Patch Changes

- [`25f444b`](https://github.com/tonightpass/tonightpass/commit/25f444bcfffdad19d1d1e81913e9b91bc1428621) Thanks [@antoinekm](https://github.com/antoinekm)! - Use native Stripe.Invoice types instead of custom Invoice type

  Removed the custom Invoice type and updated the Order type to use Stripe.Response<Stripe.Invoice> directly. This ensures proper typing for Stripe's confirmation_secret field and eliminates type conflicts.

## 0.0.174

### Patch Changes

- [`33a56df`](https://github.com/tonightpass/tonightpass/commit/33a56dfa473a7efca10c4cc6679eb68fe3f1f25d) Thanks [@antoinekm](https://github.com/antoinekm)! - Add Invoice type extension for Stripe Connect compatibility

  Extends the base Invoice type with additional properties needed for TonightPass Stripe Connect integration:
  - `payment_intent?: string | Stripe.PaymentIntent` - Expanded payment intent reference
  - `client_secret?: string` - Client secret for frontend payment processing
  - `confirmation_secret?: string` - String-based confirmation secret for frontend compatibility

  This change improves type safety while maintaining compatibility with the existing payment system that expects `confirmation_secret` as a string rather than Stripe's default object structure.

## 0.0.173

### Patch Changes

- [`632a90b`](https://github.com/tonightpass/tonightpass/commit/632a90b02dfbe6dfd1d8b45dd358ad3fe5ed752f) Thanks [@antoinekm](https://github.com/antoinekm)! - Add endpoint to leave an organization and update member endpoints to use username instead of userId:
  - DELETE /organizations/:organizationSlug/members/@me
  - PUT /organizations/:organizationSlug/members/:username (was :userId)
  - DELETE /organizations/:organizationSlug/members/:username (was :userId)

## 0.0.172

### Patch Changes

- [`2053f71`](https://github.com/tonightpass/tonightpass/commit/2053f71a52d51c09b1b63d029c5747f922c4fedd) Thanks [@antoinekm](https://github.com/antoinekm)! - Add organization invitation endpoints and reorganize SDK structure:
  - GET /organizations/:organizationSlug/members/invitations/links - list invitation links
  - POST /organizations/:organizationSlug/members/invitations/links - create invitation link
  - POST /organizations/:organizationSlug/members/invitations/accept - accept with token
  - PUT /organizations/:organizationSlug/members/@me/accept - accept direct invitation
  - DELETE /organizations/:organizationSlug/members/@me/reject - reject direct invitation

  SDK reorganized with invitations sub-module:
  - tnp.organizations.members.invitations.getLinks()
  - tnp.organizations.members.invitations.createLink()
  - tnp.organizations.members.invitations.accept()
  - tnp.organizations.members.accept()
  - tnp.organizations.members.reject()

## 0.0.171

### Patch Changes

- [`898fb5b`](https://github.com/tonightpass/tonightpass/commit/898fb5b575bc7b8190d976cf3bea19b8a06337d6) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix OrganizationToken role type from string to OrganizationMemberRole
  - Changed `OrganizationToken.role` type from `string` to `OrganizationMemberRole`
  - Improves type safety for organization invitation tokens

## 0.0.170

### Patch Changes

- [`bbcee13`](https://github.com/tonightpass/tonightpass/commit/bbcee13ed5eee585b12487f083389af18388569d) Thanks [@antoinekm](https://github.com/antoinekm)! - Add organization invitation system with links and acceptance endpoints
  - Added `OrganizationToken` type for invitation tokens
  - Added `CreateOrganizationMemberInvitationLinkDto` for creating invitation links with optional role
  - Added `AcceptOrganizationMemberInvitationDto` for accepting invitations with token
  - Added SDK methods `createInvitationLink()` and `acceptInvitation()`
  - Added endpoints:
    - `POST /organizations/:organizationSlug/members/invitations/links` - Create invitation link
    - `POST /organizations/:organizationSlug/members/invitations/accept` - Accept invitation
  - Enhanced organization member management with secure token-based invitations

## 0.0.169

### Patch Changes

- [`d0c4ccc`](https://github.com/tonightpass/tonightpass/commit/d0c4ccce623993d6c25b282e168eb4afc0984c3a) Thanks [@antoinekm](https://github.com/antoinekm)! - fix: make password field optional in User to support OAuth authentication

  The password field is now optional (`password?: string`) as users can authenticate via OAuth providers (Google, Facebook, Twitter) without having a password stored in the database.

## 0.0.168

### Patch Changes

- [`200a5f3`](https://github.com/tonightpass/tonightpass/commit/200a5f3c9729b3824fe90266f081ebb6eb813804) Thanks [@antoinekm](https://github.com/antoinekm)! - Add complete organization members management SDK methods
  - Add missing SDK methods for organization members management
  - Remove unsafe global endpoints (GET /organizations/members, DELETE /organizations/members/:memberId)
  - Implement secure organization-scoped member operations:
    - `me()` - Get user's organization memberships
    - `get(organizationSlug)` - Get organization members
    - `create(organizationSlug, data)` - Add member to organization
    - `update(organizationSlug, userId, data)` - Update member role
    - `delete(organizationSlug, userId)` - Remove member from organization

## 0.0.167

### Patch Changes

- [`c57e549`](https://github.com/tonightpass/tonightpass/commit/c57e549fa402f7d9d148522843319f4429759f16) Thanks [@antoinekm](https://github.com/antoinekm)! - Add isOfficial to BaseProfileMetadata and remove unused idValid field from UserProfileMetadata

## 0.0.166

### Patch Changes

- [`d024501`](https://github.com/tonightpass/tonightpass/commit/d0245011294169b421c2838ccda92e7a20c088e1) Thanks [@antoinekm](https://github.com/antoinekm)! - Add isVerified and isOfficial boolean fields to user types

## 0.0.165

### Patch Changes

- [`601f2f1`](https://github.com/tonightpass/tonightpass/commit/601f2f1c69b5826885b1efc1a5669843ec2a3685) Thanks [@antoinekm](https://github.com/antoinekm)! - Reduce message content length limit from 4000 to 1024 characters and remove attachment updates
  - Update CreateChannelMessageDto content length validation from 4000 to 1024 characters
  - Update UpdateChannelMessageDto content length validation from 4000 to 1024 characters
  - Remove attachments field from UpdateChannelMessageDto to prevent attachment modifications after message creation
  - Improve message length consistency across the platform

## 0.0.164

### Patch Changes

- [`f29e1a1`](https://github.com/tonightpass/tonightpass/commit/f29e1a1a2ed5974cab9fcca1a038fbc21cdb889b) Thanks [@antoinekm](https://github.com/antoinekm)! - Make content field optional in ChannelMessage entity and types. The content field is now nullable in the database entity and optional in TypeScript types, allowing messages to be created with only attachments and no text content.

## 0.0.163

### Patch Changes

- [`7ecfcb1`](https://github.com/tonightpass/tonightpass/commit/7ecfcb1254d0fbb134a7a790a98023c3b280bf74) Thanks [@antoinekm](https://github.com/antoinekm)! - Allow sending messages with only attachments (no text content). Updated validation to accept messages with either content or attachments, and fixed frontend to not send empty content field when there's no text.

## 0.0.162

### Patch Changes

- [`52cc7c1`](https://github.com/tonightpass/tonightpass/commit/52cc7c16abfd42608e81724e3bea708aca40dc2b) Thanks [@antoinekm](https://github.com/antoinekm)! - Update channel message attachment validation regex
  - Update attachment validation regex to only accept private channel attachment paths
  - Restrict to pattern: `channels/[channelId]/messages/[messageId]/private/[uniqueHash]`

## 0.0.161

### Patch Changes

- [`428038b`](https://github.com/tonightpass/tonightpass/commit/428038bbc9b26dff6e4b456b1146492f5c3337a7) Thanks [@antoinekm](https://github.com/antoinekm)! - Update URL validation patterns, add file upload endpoints and message reporting
  - Add new file upload endpoints for channel message attachments
  - Update all DTO validations to use strict CDN URL patterns with flexible ID formats
  - Replace `@IsUrl()` with `@Matches()` for more precise validation
  - Add support for temp and permanent S3 bucket paths
  - Update message DTOs to use string arrays for attachments instead of complex objects
  - Make message content optional when attachments are provided
  - Add message reporting endpoints with comprehensive reason categories
  - Add ChannelMessageReportReason enum with 16 specific report categories
  - Add SDK methods for file upload and message reporting (uploadFile, uploadFileByOrganization, report, reportByOrganization)

## 0.0.160

### Patch Changes

- [`7f32ce5`](https://github.com/tonightpass/tonightpass/commit/7f32ce5cceda9245c015e0ce91e0fb95d4bb9d38) Thanks [@antoinekm](https://github.com/antoinekm)! - Rename ChannelMessage boolean properties to follow naming convention
  - Renamed `sent` to `isSent`
  - Renamed `delivered` to `isDelivered`
  - Renamed `read` to `isRead`
  - Renamed `edited` to `isEdited`

## 0.0.159

### Patch Changes

- [`18d6b13`](https://github.com/tonightpass/tonightpass/commit/18d6b13b5992b77feb067f93113e925673c96a51) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix circular type reference in UserBookingTicket
  - Added `UserBookingWithoutTickets` type to break circular reference between `UserBooking` and `UserBookingTicket`
  - Updated `UserBookingTicket.booking` to use `UserBookingWithoutTickets` instead of full `UserBooking`
  - This prevents "Maximum call stack size exceeded" errors in entity serialization
  - Maintains type safety while eliminating circular dependencies

## 0.0.158

### Patch Changes

- [`d3c17fa`](https://github.com/tonightpass/tonightpass/commit/d3c17fa391002b567d1e0c58eebb67befa6786d7) Thanks [@antoinekm](https://github.com/antoinekm)! - Improved type safety by using UserProfile and OrganizationProfile types instead of full User and Organization entities in public-facing API types. This prevents exposure of sensitive data like passwords, internal IDs, and private settings through the type system.

  Changes:
  - Updated notification types to use UserProfile for follower field
  - Updated organization event types to use OrganizationProfile
  - Updated organization member types to use profile types
  - Fixed various endpoint type definitions to return profile types instead of full entities
  - Maintained full User/Organization types only where appropriate (auth endpoints, internal operations)

## 0.0.157

### Patch Changes

- [`649db82`](https://github.com/tonightpass/tonightpass/commit/649db82d726ed028f4e7ee59a3ad835601b62091) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix reply validation in CreateChannelMessageDto

  Changed replyToId validation from @IsUUID("4") to @IsMongoId() to match MongoDB ObjectId format used in the database. This fixes the "Validation failed" error when sending reply messages.

## 0.0.156

### Patch Changes

- [`5780152`](https://github.com/tonightpass/tonightpass/commit/57801524b9bb37a2831fe14a62e0ef3c8e38f67a) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix number transformation in ticket DTOs

  Add @Transform decorators to price and quantity fields in CreateOrganizationEventTicketDto and UpdateOrganizationEventTicketDto to properly convert string values to numbers during validation.

## 0.0.155

### Patch Changes

- [`47b1872`](https://github.com/tonightpass/tonightpass/commit/47b1872cf9a247455e2ef8a071439546f8e04d2b) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix CreateOrganizationEventDto inheritance to use concrete class instead of abstract BaseOrganizationEventDto for form validation compatibility

## 0.0.154

### Patch Changes

- [`a32937e`](https://github.com/tonightpass/tonightpass/commit/a32937e1ff15e31d4084a00fe7aab61586e4ecba) Thanks [@antoinekm](https://github.com/antoinekm)! - Add currencies SDK methods
  - Add currencies.getRates() method for fetching exchange rates
  - Add currencies.convert() method for currency conversion
  - Add currencies.convertAmount() helper method
  - Enable easy client-side integration with currencies API

- [`a32937e`](https://github.com/tonightpass/tonightpass/commit/a32937e1ff15e31d4084a00fe7aab61586e4ecba) Thanks [@antoinekm](https://github.com/antoinekm)! - Rename currency endpoints to currencies for better consistency
  - Rename CurrencyEndpoints to CurrenciesEndpoints
  - Change endpoint paths from /currency/_ to /currencies/_
  - Update directory structure from currency/ to currencies/
  - Improve API naming consistency

- [`a32937e`](https://github.com/tonightpass/tonightpass/commit/a32937e1ff15e31d4084a00fe7aab61586e4ecba) Thanks [@antoinekm](https://github.com/antoinekm)! - Reorganize Currency enum to currency module
  - Move Currency enum from main types to currency/index.ts
  - Keep Currency enum co-located with currency-related interfaces
  - Improve module organization and type structure

## 0.0.153

### Patch Changes

- [`e199aad`](https://github.com/tonightpass/tonightpass/commit/e199aade682a26930cf48a1154b8132de4f30634) Thanks [@antoinekm](https://github.com/antoinekm)! - Remove redundant source field from ExchangeRates interface
  - Remove source field from ExchangeRates interface since we only support ECB
  - Simplify the interface by removing unnecessary information

## 0.0.152

### Patch Changes

- [`be81c06`](https://github.com/tonightpass/tonightpass/commit/be81c06c3af7e9a07138e65972b985d1e01730e7) Thanks [@antoinekm](https://github.com/antoinekm)! - Remove fallback source option from ExchangeRates interface
  - Change ExchangeRates.source from "ecb" | "fallback" to "ecb" only
  - Enforce ECB as the sole exchange rate source without fallback options

## 0.0.151

### Patch Changes

- [`7e20601`](https://github.com/tonightpass/tonightpass/commit/7e20601ee0a92e85ad67c4a84de544650fc8385f) Thanks [@antoinekm](https://github.com/antoinekm)! - Add currency exchange rates support and expand Currency enum
  - Add ExchangeRates, CurrencyConversion, and CurrencyConversionResult types
  - Add CurrencyEndpoints with GET /currency/rates and POST /currency/convert
  - Expand Currency enum with all European currencies (20+ currencies including BGN, CZK, DKK, HUF, PLN, RON, SEK, CHF, NOK, ISK, TRY, RUB, UAH, etc.)
  - Support for real-time currency conversion with ECB rates
  - Enable frontend currency switching with backend API integration

## 0.0.150

### Patch Changes

- [`006ca4d`](https://github.com/tonightpass/tonightpass/commit/006ca4d07e45d071aa9ed3e672b970dc4a272db1) Thanks [@antoinekm](https://github.com/antoinekm)! - Add BaseOrganizationEventDto for step-by-step validation
  - Add BaseOrganizationEventDto abstract class for event details validation (without tickets)
  - Refactor CreateOrganizationEventDto to extend BaseOrganizationEventDto
  - Enable separate validation for step 1 (event details) and step 2 (complete event with tickets)
  - Fix AtLeastOneMediaConstraint to use BaseOrganizationEventDto type

## 0.0.149

### Patch Changes

- [`b2ed9ab`](https://github.com/tonightpass/tonightpass/commit/b2ed9ab055b6bd8c652f793b37f343363484da7f) Thanks [@antoinekm](https://github.com/antoinekm)! - Add missing validation decorators to CreateOrganizationEventOrderDto
  - Added @IsArray() and @IsString({ each: true }) decorators to cart field
  - Fixes validation error when creating orders due to missing property validation

## 0.0.148

### Patch Changes

- [`6772d65`](https://github.com/tonightpass/tonightpass/commit/6772d65ceca69cac2a8ea57c6d6a767daa4a1747) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix ticket description validation to be truly optional
  - Changed `@Length(1, 1024)` to `@Length(0, 1024)` in CreateOrganizationEventTicketDto
  - Changed `@Length(1, 1024)` to `@Length(0, 1024)` in UpdateOrganizationEventTicketDto
  - This allows ticket descriptions to be empty strings, making them truly optional

## 0.0.147

### Patch Changes

- [`fc382f7`](https://github.com/tonightpass/tonightpass/commit/fc382f79b741c476e539a40ba6c80e771c7044c1) Thanks [@antoinekm](https://github.com/antoinekm)! - Add validation to require at least one style for organization events
  - Replace `@IsNotEmpty()` with `@ArrayMinSize(1)` for styles field in CreateOrganizationEventDto
  - Ensures events must have at least one style selected before creation
  - Prevents creation of events with empty styles array

## 0.0.146

### Patch Changes

- [`27efae1`](https://github.com/tonightpass/tonightpass/commit/27efae181a03c3952589b3f42e47af2539feff9e) Thanks [@antoinekm](https://github.com/antoinekm)! - Add validation to ensure at least one media (flyer or trailer) is required for organization events
  - Add `@AtLeastOneMedia()` validator to CreateOrganizationEventDto
  - Add `@AtLeastOneMediaOnUpdate()` validator to UpdateOrganizationEventDto
  - Add backend validation in organization-event.service.ts
  - Frontend validation with disabled button and toast error message
  - Prevents creation/update of events without any media files

## 0.0.145

### Patch Changes

- [`2b39067`](https://github.com/tonightpass/tonightpass/commit/2b3906788adbf0666042bd5d96bab79eb96fc55c) Thanks [@antoinekm](https://github.com/antoinekm)! - Standardize date field handling across all DTOs
  - Ensure consistent `@Transform()` decorator for automatic string-to-Date conversion
  - Replace mixed `@IsDateString()` and `@IsDate()` usage with standardized `@IsDate()`
  - Add proper `@MinDate()` validation for future date requirements
  - Apply consistent pattern: `@Transform(({ value }) => (value instanceof Date ? value : new Date(value)))`
  - Fix date validation issues in event creation and user management forms

## 0.0.144

### Patch Changes

- [`3cff712`](https://github.com/tonightpass/tonightpass/commit/3cff712584bb067c158ac0ad41f66cf6ae71e516) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix GeoPointDto validation decorators
  - Replace invalid @ValidateNested() on method with proper @Validate() custom validator
  - Create CoordinatesRangeConstraint for geographic coordinate validation
  - Ensure coordinates are within valid latitude (-90 to 90) and longitude (-180 to 180) ranges
  - Fix class-validator compatibility issues with geometry validation

## 0.0.143

### Patch Changes

- [`01d9a87`](https://github.com/tonightpass/tonightpass/commit/01d9a87e82eaa4fb17be4920aedea9f36ddf7f9a) Thanks [@antoinekm](https://github.com/antoinekm)! - Add temporary media upload endpoint for event creation
  - Add new `/events/files/:eventFileType` endpoint type definition
  - Rename `uploadFile` to `uploadOrganizationFile` for organization-specific uploads
  - Add new `uploadFile` method for temporary uploads without organization context
  - Support uploading media files to temporary storage before event creation
  - Enables media upload for non-authenticated users during event creation flow

## 0.0.142

### Patch Changes

- [`c4713de`](https://github.com/tonightpass/tonightpass/commit/c4713deb15f0767396403ab43f4db46b5b1a547e) Thanks [@antoinekm](https://github.com/antoinekm)! - Add event media upload functionality with support for flyers and trailers
  - Add `OrganizationEventFileType` enum with Flyer and Trailer types
  - Add file upload endpoint type definition for events
  - Add `uploadFile` method to events SDK for uploading media files
  - Support for both image and video file uploads with proper validation

## 0.0.141

### Patch Changes

- [`e0b94fd`](https://github.com/tonightpass/tonightpass/commit/e0b94fd4f0826fbcefd67a096c26f229f3854d59) Thanks [@antoinekm](https://github.com/antoinekm)! - Add ChannelMemberRole enum
  - Add ChannelMemberRole enum with Member and Admin values

## 0.0.140

### Patch Changes

- [`abd4578`](https://github.com/tonightpass/tonightpass/commit/abd457810a706839f866a5d29bad23a47c2a36ad) Thanks [@antoinekm](https://github.com/antoinekm)! - Add channel status system for message view states
  - Add `ChannelStatus` enum with Snapchat-style message statuses:
    - `sent`: Message sent but not delivered yet
    - `delivered`: Message sent and delivered
    - `read`: Message sent and opened by recipient
    - `received`: Message received but not yet read
    - `opened`: Message received and read by user
  - Add optional `status` field to `Channel` type to track last message status
  - This enables status icons in the inbox channel list:
    - Gray arrow: Sent but not delivered
    - Blue filled arrow: Delivered
    - Blue outlined arrow: Read by recipient
    - Blue filled chat bubble: Received but unread
    - Blue outlined chat bubble: Received and read

## 0.0.139

### Patch Changes

- [`60d0c46`](https://github.com/tonightpass/tonightpass/commit/60d0c468ac8c031f2fdf577023e148e5268633e6) Thanks [@antoinekm](https://github.com/antoinekm)! - Add organization-specific channel endpoints and update channel API structure
  - Update channel endpoints to support both user (@me) and organization-specific routes
  - Add UserChannelCountOptions type for counting unseen channels
  - Extend channel message endpoints with organization support
  - Update SDK methods to handle organization-specific channel operations
  - Add proper typing for channel members and message reactions
  - Improve ArrayResult and ArrayOptions usage throughout channel APIs

## 0.0.138

### Patch Changes

- [`fc65f7d`](https://github.com/tonightpass/tonightpass/commit/fc65f7da07c0ef4f7fb638a322a2852f4130fe16) Thanks [@antoinekm](https://github.com/antoinekm)! - Add specific types for channel message reactions and read status tracking. Created `ChannelMessageReaction` and `ChannelMessageReadByEntry` types to replace inline object types in `ChannelMessage` for better type safety and maintainability.

## 0.0.137

### Patch Changes

- [`2a2990d`](https://github.com/tonightpass/tonightpass/commit/2a2990d4972065944a9ad1080ab8a9f95284c540) Thanks [@antoinekm](https://github.com/antoinekm)! - Add chat system with channels and messages
  - Add Channel and ChannelMessage types with full TypeScript support
  - Support for private (2 participants) and group channels (up to 50 participants)
  - **Profile-based participants**: Both users and organizations can participate as ChannelParticipant = Profile
  - Rich messaging features: attachments, mentions, replies, reactions, read receipts
  - Comprehensive DTOs with validation for all operations (AddParticipantDto, AddReactionDto, etc.)
  - Complete SDK client methods for channels and messages CRUD operations
  - Channel member management with role-based permissions
  - Message editing, deletion, and reaction capabilities
  - Type-safe endpoint definitions and proper validation schemas

## 0.0.136

### Patch Changes

- [`2a2990d`](https://github.com/tonightpass/tonightpass/commit/2a2990d4972065944a9ad1080ab8a9f95284c540) Thanks [@antoinekm](https://github.com/antoinekm)! - Add Discord-oriented chat system with channels and messages
  - Add Channel and ChannelMessage types with full TypeScript support
  - Support for private (2 users) and group channels (up to 50 users)
  - Rich messaging features: attachments, mentions, replies, reactions, read receipts
  - Comprehensive DTOs with validation for channel and message operations
  - Complete SDK client methods for channels and messages CRUD operations
  - Channel member management with role-based permissions
  - Message editing, deletion, and reaction capabilities
  - Type-safe endpoint definitions and proper validation schemas

## 0.0.135

### Patch Changes

- [`15f5f65`](https://github.com/tonightpass/tonightpass/commit/15f5f658a68708f2cbc733bbc4edd8e68fa02969) Thanks [@antoinekm](https://github.com/antoinekm)! - Update password recovery token structure to use tokenId and tokenValue fields
  - Changed RecoveryResetDto to use `tokenId` and `tokenValue` instead of `token` and `tokenId`
  - Updated URL parameters to use `id` and `value` for better semantic naming
  - Improved token validation security by requiring both token ID and value

## 0.0.134

### Patch Changes

- [`1571d78`](https://github.com/tonightpass/tonightpass/commit/1571d7800d39ab3742c04c5551514d8608414077) Thanks [@antoinekm](https://github.com/antoinekm)! - Add RecoveryResponse type for password recovery endpoint

  Added new `RecoveryResponse` interface to provide feedback about where the recovery email/SMS was sent. The response includes a `to` field that contains the masked destination (e.g., "joh**\*@gmail.com" or "+33 6 ** \*\* 99 99") to inform users where their recovery message was delivered while maintaining privacy.

## 0.0.133

### Patch Changes

- [`d334775`](https://github.com/tonightpass/tonightpass/commit/d334775121e1a251db2f5028046ec4148a6b60cf) Thanks [@antoinekm](https://github.com/antoinekm)! - Add password recovery functionality with forgot password and reset password DTOs and endpoints

## 0.0.132

### Patch Changes

- [`0272845`](https://github.com/tonightpass/tonightpass/commit/027284513b279261a5364e78845e694377547edd) Thanks [@antoinekm](https://github.com/antoinekm)! - Remove organization-event-metrics type and integrate metrics directly into organization-event

## 0.0.131

### Patch Changes

- [`80c71a6`](https://github.com/tonightpass/tonightpass/commit/80c71a6297dbab23b92cc32aabdab01e40ead1e3) Thanks [@antoinekm](https://github.com/antoinekm)! - Improve OrganizationEvent to use OrganizationEventMetrics for improved metrics tracking

## 0.0.130

### Patch Changes

- [`9aae9c1`](https://github.com/tonightpass/tonightpass/commit/9aae9c12e4ef3619536d5d99208b3089b86e8417) Thanks [@jerembdn](https://github.com/jerembdn)! - Update CreateUserIdentityDto validation

## 0.0.129

### Patch Changes

- [`c1f7ca6`](https://github.com/tonightpass/tonightpass/commit/c1f7ca668bbae4fcd41e38c5ed035af16f3be9ef) Thanks [@jerembdn](https://github.com/jerembdn)! - update errored api response type and improve create user dto validation

## 0.0.128

### Patch Changes

- Fix GeoPointDto coordinates validation to simplify array check

## 0.0.127

### Patch Changes

- [#664](https://github.com/tonightpass/tonightpass/pull/664) [`27f20af`](https://github.com/tonightpass/tonightpass/commit/27f20afe8b21ed1ffef23ce12259d9bc61ec48ca) Thanks [@jerembdn](https://github.com/jerembdn)! - Fix DTO validation for location and organization event ticket

## 0.0.126

### Patch Changes

- [`f13a06b`](https://github.com/tonightpass/tonightpass/commit/f13a06bc9d2aac7355ce58be4001c4bbfb3d417e) Thanks [@jerembdn](https://github.com/jerembdn)! - Add Search support on Organizations and Events

## 0.0.125

### Patch Changes

- Update query params on endpoint

## 0.0.124

### Patch Changes

- [`0eb1598`](https://github.com/tonightpass/tonightpass/commit/0eb15981db1e5144871041885a917a7ff1346741) Thanks [@jerembdn](https://github.com/jerembdn)! - Add Search query to profiles client

## 0.0.123

### Patch Changes

- [#649](https://github.com/tonightpass/tonightpass/pull/649) [`d168892`](https://github.com/tonightpass/tonightpass/commit/d168892c5bac0d6bbf97a398b167291e43a76ff6) Thanks [@jerembdn](https://github.com/jerembdn)! - Update user identifier regex validation

## 0.0.122

### Patch Changes

- [`7932ff2`](https://github.com/tonightpass/tonightpass/commit/7932ff219f3b2626c4c6672040455d2e576220bb) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add a comprehensive ErrorType enum to standardize error handling across the API.

## 0.0.121

### Patch Changes

- [`ffce706`](https://github.com/tonightpass/tonightpass/commit/ffce706b72073d8ec4c35912b6bedff3d7790b2f) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix update organization dto

## 0.0.120

### Patch Changes

- [`d88e72a`](https://github.com/tonightpass/tonightpass/commit/d88e72a108603604924ed9a7a438b05a4d5c0537) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add password length validation and enhance security requirements

## 0.0.119

### Patch Changes

- [`c2f7c66`](https://github.com/tonightpass/tonightpass/commit/c2f7c6621c6c639db82e29f59c662d4102eb15b1) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update build strategy

## 0.0.118

### Patch Changes

- [`8f2ab17`](https://github.com/tonightpass/tonightpass/commit/8f2ab1741dacc6721484bce7629cca2c3c89a8bf) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Enhance package.json

## 0.0.117

### Patch Changes

- [`92a0b47`](https://github.com/tonightpass/tonightpass/commit/92a0b47c202e21aeaa3bf2dc19be4a413703b833) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add endpoints for retrieving past and upcoming organization events

## 0.0.116

### Patch Changes

- [`29c2acb`](https://github.com/tonightpass/tonightpass/commit/29c2acbbac9ceb4bb0ba6f55b3bbec061a81f329) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add viewsCount property to OrganizationEvent type

## 0.0.115

### Patch Changes

- [`7a18ad3`](https://github.com/tonightpass/tonightpass/commit/7a18ad39bb7f7a1df9440d71afef688f2dcdf520) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Simplify OrganizationEventViewEndpoints and remove unused heartbeat function

## 0.0.114

### Patch Changes

- [`c67af31`](https://github.com/tonightpass/tonightpass/commit/c67af316e99afa56392704c802e5eb037d1b2e0e) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update OrganizationEventViewEndpoints to use null type for response

## 0.0.113

### Patch Changes

- [`21e2771`](https://github.com/tonightpass/tonightpass/commit/21e2771ffc99fa394e5eb605e0d2c6ec05bf8d34) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update OrganizationEventViewEndpoints to use string type for views

## 0.0.112

### Patch Changes

- [`f3c79e2`](https://github.com/tonightpass/tonightpass/commit/f3c79e2757290a037f6344cff0af4ac3d3e819ee) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add organization event views endpoints and SDK methods

## 0.0.111

### Patch Changes

- [`3f68f6d`](https://github.com/tonightpass/tonightpass/commit/3f68f6d98f1aa4924eb81848cf4fd3ddfef92934) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add recordView method to track event views for organizations

## 0.0.110

### Patch Changes

- [`cf17374`](https://github.com/tonightpass/tonightpass/commit/cf17374cb712c828fcbcba223b554a97bd786ff1) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add new endpoint for recording event views in organization events

## 0.0.109

### Patch Changes

- [`e28d776`](https://github.com/tonightpass/tonightpass/commit/e28d776f24a1a30a1e40dd7bf256e4c647c973c2) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update OrganizationEvent DTOs with strict rules

## 0.0.108

### Patch Changes

- [`4c5beb1`](https://github.com/tonightpass/tonightpass/commit/4c5beb171610e943692dec16ca1f60e9704a4409) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add Distance type to include distance property in GeoSearchAggregation

## 0.0.107

### Patch Changes

- [`5c172ad`](https://github.com/tonightpass/tonightpass/commit/5c172ad4e7152f4ebd3567a8cc8693683120cc5b) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add location types and geometry definitions in a new locations module

## 0.0.106

### Patch Changes

- [`704be44`](https://github.com/tonightpass/tonightpass/commit/704be441b4bea857e2781a6058c6bae3a5dd50dd) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add GeoPoint type and update Location geometry to use GeoPoint

## 0.0.105

### Patch Changes

- [`cdab1e2`](https://github.com/tonightpass/tonightpass/commit/cdab1e2673e8b5aa5e20d50a3ddee2c9642677c9) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix export notifications types from user module

## 0.0.104

### Patch Changes

- [`b6e5f77`](https://github.com/tonightpass/tonightpass/commit/b6e5f7764cc7abc1843c1fa28e2b2da2daa5f2b8) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add user notifications endpoints and integrate into user sdk

## 0.0.103

### Patch Changes

- [`3d3f728`](https://github.com/tonightpass/tonightpass/commit/3d3f728c1a0ec29e9503037e56e6028220abb9a6) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update `ProfileEndpoints` to use `UserProfile` and `User` types for followers endpoint

## 0.0.102

### Patch Changes

- [`b01ddf4`](https://github.com/tonightpass/tonightpass/commit/b01ddf4de1244a51f8d9a1deb6d0c2ee73d4a623) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add `getFollowers` endpoint to retrieve profile followers

## 0.0.101

### Patch Changes

- [`869de31`](https://github.com/tonightpass/tonightpass/commit/869de31f840fa93d763e5ad4c275c5cc867b91fd) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add content type header in request once it's deleted

## 0.0.100

### Patch Changes

- [`f1a5956`](https://github.com/tonightpass/tonightpass/commit/f1a5956c1c10af1da6d7cf875b4e25c43727eb50) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix content type header in request

## 0.0.99

### Patch Changes

- [`d574763`](https://github.com/tonightpass/tonightpass/commit/d5747632e44521a283110dc15542e0e161b0ab08) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add user file upload handling endpoints and sdk

## 0.0.98

### Patch Changes

- [`6fecd47`](https://github.com/tonightpass/tonightpass/commit/6fecd470fbc999bc72afba00b09ed58056cfdf44) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix header type check for content-type handling in request.ts

## 0.0.97

### Patch Changes

- [`a9c46b5`](https://github.com/tonightpass/tonightpass/commit/a9c46b5b0efeb73afcc3ab1ae9a5c8ca9deec8c3) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix header type check for Content-Type handling

## 0.0.96

### Patch Changes

- [`d7f9e6c`](https://github.com/tonightpass/tonightpass/commit/d7f9e6cbd5d44fe0ac9edf09772cc4dd17d95702) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add slug property to base profile

## 0.0.95

### Patch Changes

- [`f3fcf23`](https://github.com/tonightpass/tonightpass/commit/f3fcf23fc3b88a3cd6d45c42e89c34b54d02a7b8) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update profile suggestions endpoint path

## 0.0.94

### Patch Changes

- [`eb08d5d`](https://github.com/tonightpass/tonightpass/commit/eb08d5d1b59fb1878d513daf4bffb1d7836f12b8) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Refactor users suggestions into profiles suggestions

## 0.0.93

### Patch Changes

- [`9296b99`](https://github.com/tonightpass/tonightpass/commit/9296b99ad02acd42ee9e16df1341e845c9d1f531) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update user booking endpoint types and add user suggestions endpoint

## 0.0.92

### Patch Changes

- [`b206f3a`](https://github.com/tonightpass/tonightpass/commit/b206f3a1eddb428aa1c930274429f9b0a964247f) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update user booking endpoint types

## 0.0.91

### Patch Changes

- [`fdadaae`](https://github.com/tonightpass/tonightpass/commit/fdadaae14650f9b81477b33fdfd1fb06ed5ecfa9) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update user booking endpoint types

## 0.0.90

### Patch Changes

- [`6832c70`](https://github.com/tonightpass/tonightpass/commit/6832c70a6c93373c8784faaf8b47635b32958bf4) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add UserTokenType for BookingTicket

- [`fedecd3`](https://github.com/tonightpass/tonightpass/commit/fedecd33cba5c371d558b0b15e2e9e9452134750) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add OrganizationEvent to UserBooking type

## 0.0.89

### Patch Changes

- [`38ab30d`](https://github.com/tonightpass/tonightpass/commit/38ab30d4a31931ec29b44def02edce2d6fb67ebb) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix incorrect types for tickets in user booking

## 0.0.88

### Patch Changes

- [`4535441`](https://github.com/tonightpass/tonightpass/commit/4535441e1615627dfe2e9a54c7f51a060ba0b903) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix wrong types for tickets in user booking

## 0.0.87

### Patch Changes

- [`fbafc8b`](https://github.com/tonightpass/tonightpass/commit/fbafc8b43ce8aefb25dc2db2cc99a0f2abed2695) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add user booking ticket types

## 0.0.86

### Patch Changes

- [`0ffe35e`](https://github.com/tonightpass/tonightpass/commit/0ffe35e12f77eb04cb9cbd8017b9ea30d8baa47c) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add response for types

## 0.0.85

### Patch Changes

- [`069a9ad`](https://github.com/tonightpass/tonightpass/commit/069a9ad614f07767b68f380e3fd3b524d2ada55d) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update array options by removing populate options temporaly

## 0.0.84

### Patch Changes

- [`32071ba`](https://github.com/tonightpass/tonightpass/commit/32071ba491f76e5fa985e0772b2092708e900685) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update health types and routes

## 0.0.83

### Patch Changes

- [`ee737eb`](https://github.com/tonightpass/tonightpass/commit/ee737eb18eb43534d3807b6523be13f5e9c1e244) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add stringified types for api types

## 0.0.82

### Patch Changes

- [`09a7e5f`](https://github.com/tonightpass/tonightpass/commit/09a7e5f9b7580f2b63b8ec07e6bf4dbdcde0f58f) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix organization member @me route in types

- [#522](https://github.com/tonightpass/tonightpass/pull/522) [`b14490c`](https://github.com/tonightpass/tonightpass/commit/b14490c403be4623dde4228a90c9008246004342) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Improve client types with full response and body

## 0.0.81

### Patch Changes

- [`8b24471`](https://github.com/tonightpass/tonightpass/commit/8b244717d0f57ae5d6687587eb0d3d7c57e6ef35) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update organization event ticket types with event

## 0.0.80

### Patch Changes

- [`b75f934`](https://github.com/tonightpass/tonightpass/commit/b75f934693020428df387d0ce79fe55669bd0e94) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update typo of me into @me routes to avoid confusions with username

## 0.0.79

### Patch Changes

- [`969a10d`](https://github.com/tonightpass/tonightpass/commit/969a10df15f0fa15980e0dfc5a25ed8ba7f56991) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update workplace type and remote type in careers types

## 0.0.78

### Patch Changes

- [`1f42eb0`](https://github.com/tonightpass/tonightpass/commit/1f42eb0c66981c3f2b3374e1e0c86b6101319d0b) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add endpoint for retrieving user's own bookings

## 0.0.77

### Patch Changes

- [`9bbacf5`](https://github.com/tonightpass/tonightpass/commit/9bbacf5c7e50ff2477c4bd163a678a1dd3096c38) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Remove vatRate from OrganizationEvent

## 0.0.76

### Patch Changes

- [`46ce556`](https://github.com/tonightpass/tonightpass/commit/46ce5567a37b62e3f4d9501fcdda07a99e329067) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add user booking types

## 0.0.75

### Patch Changes

- [`4606121`](https://github.com/tonightpass/tonightpass/commit/46061214a2877c105ca9a2f6f1f2a2a6bd222df8) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add swr config to api hook

## 0.0.74

### Patch Changes

- [`56c3c06`](https://github.com/tonightpass/tonightpass/commit/56c3c06e61e60a22367f799b8475f577fee53357) Thanks [@jerembdn](https://github.com/jerembdn)! - Update SubscribeToBeta

## 0.0.73

### Patch Changes

- [`9550cbc`](https://github.com/tonightpass/tonightpass/commit/9550cbc9f34fa89551778480f2e4f09125fb36a2) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Remove following count from profiles

- [`6022352`](https://github.com/tonightpass/tonightpass/commit/6022352a59ff05fa06657453bd5d532dceb166e9) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix return type of profiles relationshops follow/unfollow which are not redirections

## 0.0.72

### Patch Changes

- [`09d99c6`](https://github.com/tonightpass/tonightpass/commit/09d99c6e7d56323559c9750607c5f55baee9b7da) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update profile metadata types

## 0.0.71

### Patch Changes

- [`fc82c2e`](https://github.com/tonightpass/tonightpass/commit/fc82c2ed21e563cd60b0e3f6e5c550eac2a865a0) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update profile metadata types

## 0.0.70

### Patch Changes

- [`3d9d8dc`](https://github.com/tonightpass/tonightpass/commit/3d9d8dce18d8bdde58ab30e38a5b70f0da9857ab) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix missing types and body for profiles

## 0.0.69

### Patch Changes

- [`c16e05f`](https://github.com/tonightpass/tonightpass/commit/c16e05fb1eba23d7b4668a670ce232ebb0fc1877) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix username regex

## 0.0.68

### Patch Changes

- [`ed0996d`](https://github.com/tonightpass/tonightpass/commit/ed0996da66461a2d92dff32d9d50a2a04a840e4d) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add profiles relationships types

## 0.0.67

### Patch Changes

- [`6922f46`](https://github.com/tonightpass/tonightpass/commit/6922f46fdfe419e658c0ac9f1cec5237dc86ea0f) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update create and update user dtos

## 0.0.66

### Patch Changes

- [`f8d4e42`](https://github.com/tonightpass/tonightpass/commit/f8d4e422d24d540d566ff356fb7733def762fbd8) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update user check identifier response types

## 0.0.65

### Patch Changes

- [`336b84e`](https://github.com/tonightpass/tonightpass/commit/336b84e188174b009ef8e8537fdfd52c2b09f2e5) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update CreateUserDto types

## 0.0.64

### Patch Changes

- [`7f101a4`](https://github.com/tonightpass/tonightpass/commit/7f101a46dbe4698a62af7c5815a002890484368f) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update user identity gender types

## 0.0.63

### Patch Changes

- [`790ae8e`](https://github.com/tonightpass/tonightpass/commit/790ae8eecfab6bd1818902f02a4c93e587462c89) Thanks [@jerembdn](https://github.com/jerembdn)! - Add notifications in SDK

## 0.0.62

### Patch Changes

- [`6730d29`](https://github.com/tonightpass/tonightpass/commit/6730d29f2f73043a8c717acfe69d1dc95f1f9f1f) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update organization event ticket types

## 0.0.61

### Patch Changes

- [`333df8c`](https://github.com/tonightpass/tonightpass/commit/333df8ce2ac3bd365536863394e55b88a182e93b) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add webhooks endpoints

## 0.0.60

### Patch Changes

- [`168315c`](https://github.com/tonightpass/tonightpass/commit/168315c1c8266d3707692ae4d385282e1034b6f3) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update create organization event order dto cart types

## 0.0.59

### Patch Changes

- [`fc6c475`](https://github.com/tonightpass/tonightpass/commit/fc6c47522df170de38a13c814e4cfc8cf55f08b5) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update order sdk by replacing invoiceId by orderId

## 0.0.58

### Patch Changes

- [`18e50a2`](https://github.com/tonightpass/tonightpass/commit/18e50a2789af421008fd6715eb326dec3b67a912) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Replace sessionId by invoiceId

## 0.0.57

### Patch Changes

- [`d0a5007`](https://github.com/tonightpass/tonightpass/commit/d0a5007ff18f4b51c460a7a0b3c0b5322a4db004) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update order and organization event ticket to comply with stripe types

## 0.0.56

### Patch Changes

- [`3e62e99`](https://github.com/tonightpass/tonightpass/commit/3e62e99623675b3bf16abf0beb8d63b26efddf88) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add orders sdk

## 0.0.55

### Patch Changes

- [`dd3b572`](https://github.com/tonightpass/tonightpass/commit/dd3b572af8f7657cf03bec655d4aed6d6fb3d821) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix event orders typo in sdk

## 0.0.54

### Patch Changes

- [`498a172`](https://github.com/tonightpass/tonightpass/commit/498a1727c460cd810138a1f879c000bccc793f16) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update order types

## 0.0.53

### Patch Changes

- [`5f99503`](https://github.com/tonightpass/tonightpass/commit/5f995038b67779c45a1c8397c6c33f7cdfcea542) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix CreateOrganizationEventCheckoutDto types

## 0.0.52

### Patch Changes

- [`484ff42`](https://github.com/tonightpass/tonightpass/commit/484ff42a47a84b8c06e1523dcf7f8f3ae3919255) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Move cart into checkout

## 0.0.51

### Patch Changes

- [`01c0806`](https://github.com/tonightpass/tonightpass/commit/01c0806ee7bd7a03a975be4345419b6c6b800778) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix discarded changes of 0.0.50

## 0.0.50

### Patch Changes

- [`f873bef`](https://github.com/tonightpass/tonightpass/commit/f873befebed537f3982d63d0436bc4eaaa186aa1) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add missing organization event cart exports

- [`8284b48`](https://github.com/tonightpass/tonightpass/commit/8284b484515c18b016e0a3aa816cf8d9e80cc4e4) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add fee to organization event ticket type

## 0.0.49

### Patch Changes

- [`3ba3d9e`](https://github.com/tonightpass/tonightpass/commit/3ba3d9e118a5f4d86cd046895669f854952aaacf) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Improve regexes

- [`f02fa95`](https://github.com/tonightpass/tonightpass/commit/f02fa95dd04876389affd5027c575a7553f9dfce) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Improve variables names to be easily understandable

- [`f02fa95`](https://github.com/tonightpass/tonightpass/commit/f02fa95dd04876389affd5027c575a7553f9dfce) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add organization event cart

## 0.0.48

### Patch Changes

- [`3b35df8`](https://github.com/tonightpass/tonightpass/commit/3b35df8c6187e6010c29cfd848f3d49ae40eeec3) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update array options types with pagination and populate field as string array

## 0.0.47

### Patch Changes

- [`284e987`](https://github.com/tonightpass/tonightpass/commit/284e987bd20b892a9f6444955379d21d68d21a72) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update array options types with pagination

## 0.0.46

### Patch Changes

- [`6a67f86`](https://github.com/tonightpass/tonightpass/commit/6a67f8664fd3d0ca019e88825102add5a9e43e35) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Rename data property to items in ArrayResult type

## 0.0.45

### Patch Changes

- [`f4b07ea`](https://github.com/tonightpass/tonightpass/commit/f4b07ea8c8c47f48eda65ec7aef06e3e7e532b4b) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add array options and event listing

## 0.0.44

### Patch Changes

- [`d534d9d`](https://github.com/tonightpass/tonightpass/commit/d534d9dce38aa1dba286342323f5e3822ed80802) Thanks [@AntoineKM](https://github.com/AntoineKM)! - uUpdate Create Organization Event Ticket dto description lenght

- [`d534d9d`](https://github.com/tonightpass/tonightpass/commit/d534d9dce38aa1dba286342323f5e3822ed80802) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update Organization Event types

## 0.0.43

### Patch Changes

- [`667bfd2`](https://github.com/tonightpass/tonightpass/commit/667bfd22d3267bd147f8878947d52ee2a4344281) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add class validation to Organization Event Ticket

## 0.0.42

### Patch Changes

- [`10b03df`](https://github.com/tonightpass/tonightpass/commit/10b03df81cb07b237fa54f1201231945ca89eac4) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add error logging for API requests without data

## 0.0.41

### Patch Changes

- [`f1d87e0`](https://github.com/tonightpass/tonightpass/commit/f1d87e06da339a908808dd331a0f4cb85bafaeff) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add facebook oauth2

## 0.0.40

### Patch Changes

- [`6376cfd`](https://github.com/tonightpass/tonightpass/commit/6376cfd580fb4f2dd5e68564eb96e19a4925de26) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update create organization dto description

## 0.0.39

### Patch Changes

- [`01dceec`](https://github.com/tonightpass/tonightpass/commit/01dceecae7ef96360eae417ec6a61c91f50656b5) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix create organization dto dates

## 0.0.38

### Patch Changes

- [`370779f`](https://github.com/tonightpass/tonightpass/commit/370779fe1a778b113c5974dd0479ed541698f0f4) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update organization event dtos with class validator

## 0.0.37

### Patch Changes

- [`c81da9c`](https://github.com/tonightpass/tonightpass/commit/c81da9c934b567b821d6154875b70e38f12a7b27) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Remove organization prop from create organization event dto

## 0.0.36

### Patch Changes

- [`b6ccf3e`](https://github.com/tonightpass/tonightpass/commit/b6ccf3e4e2028f302367963492495f1e39766a66) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update organization event endpoint

## 0.0.35

### Patch Changes

- [`0fcfd58`](https://github.com/tonightpass/tonightpass/commit/0fcfd5891ff1e010a8fb5d8e19b06d6565f3aecc) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update organization dtos types

## 0.0.34

### Patch Changes

- [`8bdbbc9`](https://github.com/tonightpass/tonightpass/commit/8bdbbc9236b978cc1cb5683e2e063431c018875d) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update dtos with class-validator

## 0.0.33

### Patch Changes

- [`b88f3c9`](https://github.com/tonightpass/tonightpass/commit/b88f3c9fe88f6c6a97ade72e8e645f0cc34fc8dc) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix sdk sub modules

## 0.0.32

### Patch Changes

- [`eaaef01`](https://github.com/tonightpass/tonightpass/commit/eaaef0116082deac3d6a0c1ed68730a0ab738d4e) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix token type

## 0.0.31

### Patch Changes

- [`24a64ea`](https://github.com/tonightpass/tonightpass/commit/24a64ea7451fe03b7f04d760c821dabba3e96443) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add base type

## 0.0.30

### Patch Changes

- [`02663f8`](https://github.com/tonightpass/tonightpass/commit/02663f8752ed198ae6c57ed7c41838a1353f905d) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update create organization event dto styles types

## 0.0.29

### Patch Changes

- [`f463152`](https://github.com/tonightpass/tonightpass/commit/f463152a13441ebd6ea4006ce971203eb17c9b85) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix location import in create organization event dtos

## 0.0.28

### Patch Changes

- [`2b069df`](https://github.com/tonightpass/tonightpass/commit/2b069df59fcd5a51e4acf4ebd71826e878da7b31) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix create organization event dtos

## 0.0.27

### Patch Changes

- [#281](https://github.com/tonightpass/tonightpass/pull/281) [`d3ef400`](https://github.com/tonightpass/tonightpass/commit/d3ef400d824daf8f4506a753a8b3b1abb80df068) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add organization event style types, dtos, endpoints and sdk

## 0.0.26

### Patch Changes

- [#272](https://github.com/tonightpass/tonightpass/pull/272) [`b18f698`](https://github.com/tonightpass/tonightpass/commit/b18f698d929e0f37e662b8db6df0e49155339f65) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add organization events endpoints, dtos and sdk

## 0.0.25

### Patch Changes

- [`3e3e46a`](https://github.com/tonightpass/tonightpass/commit/3e3e46aca54e867b6b88d7a57c2515fd3c0bf6f5) Thanks [@jerembdn](https://github.com/jerembdn)! - Add PromisedAPIResponse

## 0.0.24

### Patch Changes

- [`6da4940`](https://github.com/tonightpass/tonightpass/commit/6da4940b7272bfbf2d4e1d9c309f7dfdd5542ddc) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add organization billing dashboard

## 0.0.23

### Patch Changes

- [`994066c`](https://github.com/tonightpass/tonightpass/commit/994066c83c282d9645894366557bcaa276b23904) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add oauth2 and organization billing to sdk

## 0.0.22

### Patch Changes

- [#261](https://github.com/tonightpass/tonightpass/pull/261) [`e24d1ba`](https://github.com/tonightpass/tonightpass/commit/e24d1ba39a9d1fa311b480d11515819b20b0ce54) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add OrganizationBilling type to Organization interface

## 0.0.21

### Patch Changes

- [`04366e1`](https://github.com/tonightpass/tonightpass/commit/04366e12d773fe5538079874c0cfafbcd7149f70) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update delete method in client class to include a body parameter

## 0.0.20

### Patch Changes

- [`526dfe4`](https://github.com/tonightpass/tonightpass/commit/526dfe4fb6169bbadee2864ca6c17a9a04e61446) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update organization endpoints to use slug instead of id

## 0.0.19

### Patch Changes

- [`5c24d62`](https://github.com/tonightpass/tonightpass/commit/5c24d621c8452de1885ab92e1588322828159ec2) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add new endpoint for getting organization by slug

## 0.0.18

### Patch Changes

- [`9b2d618`](https://github.com/tonightpass/tonightpass/commit/9b2d61837809607233152c69dadc7861f5eed469) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add missing endpoints

## 0.0.17

### Patch Changes

- [#248](https://github.com/tonightpass/tonightpass/pull/248) [`4f58bb8`](https://github.com/tonightpass/tonightpass/commit/4f58bb85cc530bed87ace1fb13e4afe34fb09d9e) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Improve organization members structure for invites

## 0.0.16

### Patch Changes

- [`bc0b252`](https://github.com/tonightpass/tonightpass/commit/bc0b2527533944a433abc10e69a8dceeec773da2) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update enums names

## 0.0.15

### Patch Changes

- [#232](https://github.com/tonightpass/tonightpass/pull/232) [`7c2353a`](https://github.com/tonightpass/tonightpass/commit/7c2353a308119eef0cb5515ad0140e8e8fd1093b) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add organization members sdk

## 0.0.14

### Patch Changes

- [`79c52a5`](https://github.com/tonightpass/tonightpass/commit/79c52a50ec141a6e817b29377d3facde337c5c9e) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add decorators support

## 0.0.13

### Patch Changes

- [`858e5f2`](https://github.com/tonightpass/tonightpass/commit/858e5f20f89db91a6d510453d8d6c089aa2792ce) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update profile type description to be optional

## 0.0.12

### Patch Changes

- [`2c5b552`](https://github.com/tonightpass/tonightpass/commit/2c5b55231112404a705a1b822c67fdcd72cd467c) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update profiles types with Organization identity

## 0.0.11

### Patch Changes

- [`e05e50e`](https://github.com/tonightpass/tonightpass/commit/e05e50eb071f55b46686f14f25ba01c1402cf84b) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix optional fields in CreateOrganizationDto

## 0.0.10

### Patch Changes

- [#218](https://github.com/tonightpass/tonightpass/pull/218) [`d4d27fb`](https://github.com/tonightpass/tonightpass/commit/d4d27fb683212d88bf4c4650ce33ab376c23f445) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix Organization types and dtos

## 0.0.9

### Patch Changes

- [`8f8bd1b`](https://github.com/tonightpass/tonightpass/commit/8f8bd1b21c684389c44c7b9ef4be3452061260e1) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add organizations sdk

## 0.0.8

### Patch Changes

- [`d009e78`](https://github.com/tonightpass/tonightpass/commit/d009e7808d5874915dc7a40e244330a8c164cdff) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix empty auth post requests

## 0.0.7

### Patch Changes

- [`e84816c`](https://github.com/tonightpass/tonightpass/commit/e84816ce49b8602f6fd98c9148ed184b5060c35a) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix auth export in tonightpass and location in dtos

## 0.0.6

### Patch Changes

- [`24d1f03`](https://github.com/tonightpass/tonightpass/commit/24d1f0323507b176c8b5b19f64f1b63c874e9a31) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add auth sdk

## 0.0.5

### Patch Changes

- [`8f7a766`](https://github.com/tonightpass/tonightpass/commit/8f7a7661541f3927f4a4f31c119f8a866abd7133) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix query types by using pathcat types

## 0.0.4

### Patch Changes

- [`595b40e`](https://github.com/tonightpass/tonightpass/commit/595b40eae03123358dfe659e97087144df9052cc) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Fix users check types

## 0.0.3

### Patch Changes

- [`2166d44`](https://github.com/tonightpass/tonightpass/commit/2166d44417e5af6e1da86681330b4aa2892775e5) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add error handler

## 0.0.2

### Patch Changes

- [`276f52e`](https://github.com/tonightpass/tonightpass/commit/276f52eb551e2dce6173c3331119a68780cea8d0) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add TonightPass exports

## 0.0.1

### Patch Changes

- [#187](https://github.com/tonightpass/tonightpass/pull/187) [`3218ecc`](https://github.com/tonightpass/tonightpass/commit/3218ecc8bdfda8d5bc1ca3988d8eb56de39d9ccb) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Add tonightpass
