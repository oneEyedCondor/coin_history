export class ResponseOnGetIntervalDto {
  readonly isError: boolean;
  readonly message: string;
  readonly object: {
    readonly interval: number;
  };
}
