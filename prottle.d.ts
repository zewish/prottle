declare const prottle: <ResponseType extends any>(
  limit: number,
  arr: Array<
    () => Promise<ResponseType>
  >
) => Promise<ResponseType[]>;

export = prottle;
