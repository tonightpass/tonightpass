// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type APIResponse<TData = any> = {
  success: boolean;
  data?: TData;
  error?: string;
};
