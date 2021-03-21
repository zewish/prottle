declare const prottle: <ResponseType extends any>(
  limit: number,
  arr: Array<
    () => Promise<any>
  >
) => Promise<ResponseType[]>;

export = prottle;
