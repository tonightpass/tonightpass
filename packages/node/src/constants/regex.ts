export const REGEX = {
  // matches a valid email address
  EMAIL: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
  // matches a name with only letters, numbers, spaces
  NAME: /^[a-zA-ZÀ-ÿ0-9-\s]+$/,
  // matches a slug with only lowercase letters, numbers, dots and underscores
  SLUG: /^[a-z0-9_.]+$/,
  // matches a username with lowercase letters, numbers, underscores, and dots
  //  - must be 3 to 48 characters long
  //  - cannot have consecutive dots
  //  - cannot start or end with a dot
  USERNAME: /^(?!\.)(?!.*\.\.)(?!.*\.$)[a-z0-9_.]{3,48}$/,
  // matches an international phone number
  PHONE: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  // matches a password with at least 8 characters, one uppercase letter, one lowercase letter and one number or special character
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d\W]).{8,}$/,
  // matches a password with at least 8 characters
  PASSWORD_MIN_LENGTH: /^.{8,}$/,
  // matches a password with one uppercase letter
  PASSWORD_UPPERCASE: /^(?=.*[A-Z])/,
  // matches a password with one lowercase letter
  PASSWORD_LOWERCASE: /^(?=.*[a-z])/,
  // matches a password with one number or special character
  PASSWORD_NUMBER_SPECIAL: /^(?=.*[\d\W])/,
  // matches an image url
  IMAGE_URL:
    /^(https:\/\/|http:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)\.(jpg|jpeg|gif|png|bmp|tiff|tga|svg)$/i,
  // matches organization avatar URL
  ORGANIZATION_AVATAR_URL:
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/organizations\/[\w-]+\/avatars\//,
  // matches organization banner URL
  ORGANIZATION_BANNER_URL:
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/organizations\/[\w-]+\/banners\//,
  // matches event flyer URL (temp or permanent)
  EVENT_FLYER_URL:
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/(temp\/events\/flyers\/|organizations\/[\w-]+\/events\/[\w-]+\/flyers\/)/,
  // matches event flyer URL for updates (includes payload CDN and file extensions)
  EVENT_FLYER_URL_UPDATE:
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com|cdn\.payload\.tonightpass\.com)\/(temp\/events\/flyers\/|organizations\/[\w-]+\/events\/[\w-]+\/flyers\/|[\w-]+\.\w+$)/,
  // matches event trailer URL (temp or permanent)
  EVENT_TRAILER_URL:
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/(temp\/events\/trailers\/|organizations\/[\w-]+\/events\/[\w-]+\/trailers\/)/,
  // matches event trailer URL for updates (includes payload CDN and file extensions)
  EVENT_TRAILER_URL_UPDATE:
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com|cdn\.payload\.tonightpass\.com)\/(temp\/events\/trailers\/|organizations\/[\w-]+\/events\/[\w-]+\/trailers\/|[\w-]+\.\w+$)/,
  // matches user avatar URL (permanent)
  USER_AVATAR_URL:
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/users\/[\w-]+\/avatars\//,
  // matches user avatar URL (temp or permanent) - for creation
  USER_AVATAR_URL_CREATE:
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/(users\/[\w-]+\/avatars\/|temp\/users\/avatars\/)/,
  // matches user banner URL
  USER_BANNER_URL:
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/users\/[\w-]+\/banners\//,
  // matches channel message private attachment path
  CHANNEL_MESSAGE_ATTACHMENT:
    /^channels\/[\w-]+\/messages\/[\w-]+\/private\/[\w-]+$/,
  // matches user post media URL (temp or permanent)
  USER_POST_MEDIA_URL:
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/(temp\/posts\/media\/|users\/[\w-]+\/posts\/[\w-]+\/media\/)/,
};
