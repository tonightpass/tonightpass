export type RestQueryResponse<TData> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: string;
    };
