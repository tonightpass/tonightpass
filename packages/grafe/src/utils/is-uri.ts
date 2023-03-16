/* eslint-disable prettier/prettier */
export const isUri = (str: string): boolean => {
  const pattern = new RegExp(
    "((\\w+:\\/\\/)[-a-zA-Z0-9:@;?&=\\/%\\+\\.\\*!'\\(\\),\\$_\\{\\}\\^~\\[\\]`#|]+)"
  );

  return pattern.test(str);
};
