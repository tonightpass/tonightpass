export const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

// checks if a password has at least one uppercase letter and a number or special character
export const PASSWORD_REGEX =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

// checks if a string has only letters, numbers, spaces, apostrophes, dots and dashes
export const NAME_REGEX = /(^[\p{L}\d'\\.\s\\-]*$)/u;

// checks if a string is a valid slug, useful for usernames
export const SLUG_REGEX = /^[a-z\d]+(?:(\.|-|_)[a-z\d]+)*$/;

// validates if passwords are valid bcrypt hashes
export const BCRYPT_HASH = /\$2[abxy]?\$\d{1,2}\$[A-Za-z\d\\./]{53}/;

export const PHONE_NUMBER_REGEX =
  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

export const IMAGE_URL_REGEX =
  /(((http:\/\/www)|(http:\/\/)|(www))[-a-zA-Z0-9@:%_\\+.~#?&//=]+)\.(jpg|jpeg|gif|png|bmp|tiff|tga|svg)/i;
