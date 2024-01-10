// eslint-disable-next-line @typescript-eslint/no-explicit-any
type APIResponse<TData = any> = (
  | {
      success: true;
      data: TData;
    }
  | APIError
) & {
  statusCode: number;
};

type APIError = {
  success: false;
  message: string;
  errors?: {
    [key: string]: string;
  };
};

export type { APIError, APIResponse };
