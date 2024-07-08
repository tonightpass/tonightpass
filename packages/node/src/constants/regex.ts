export const REGEX = {
  // matches a valid email address
  EMAIL: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
  // matches a name with only letters, numbers, spaces
  NAME: /^[a-zA-Z0-9 ]+$/,
  // matches a slug with only lowercase letters, numbers, dots and underscores
  SLUG: /^[a-z0-9_.]+$/,
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
    /^(https:\/\/|http:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)\.(jpg|jpeg|gif|png|bmp|tiff|tga|svg)$/i,
};
