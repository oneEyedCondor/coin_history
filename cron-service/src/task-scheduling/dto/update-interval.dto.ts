import { IsInt } from 'class-validator';

export class UpdateIntervalDto {
  @IsInt()
  interval: number;
}
