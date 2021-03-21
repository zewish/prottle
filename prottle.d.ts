declare const prottle: <ResponseType extends any>(
  limit: number,
  arr: Array<() => any>
) => Promise<ResponseType[]>;

export = prottle;
