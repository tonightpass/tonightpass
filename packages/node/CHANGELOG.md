# tonightpass

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
