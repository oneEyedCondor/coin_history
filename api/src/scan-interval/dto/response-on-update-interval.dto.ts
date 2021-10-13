export class ResponseOnUpdateIntervalDto {
  readonly isError: boolean;
  readonly message: string;
  readonly object: { interval: number };
}
