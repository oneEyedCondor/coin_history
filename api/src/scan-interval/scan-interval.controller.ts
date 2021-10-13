import { Controller, Get, Put, Body } from '@nestjs/common';

import { ScanIntervalService } from './scan-interval.service';
import { UpdateIntervalDto } from './dto/update-interval.dto';
import { ResponseOnGetIntervalDto } from './dto/response-on-get-interval.dto';
import { ResponseOnUpdateIntervalDto } from './dto/response-on-update-interval.dto';

@Controller('interval')
export class ScanIntervalController {
  constructor(private readonly scanIntervalService: ScanIntervalService) {}

  @Get()
  getScanInterval(): Promise<ResponseOnGetIntervalDto> {
    return this.scanIntervalService.getScanInterval();
  }

  @Put()
  updateScanInterval(
    @Body() body: UpdateIntervalDto,
  ): Promise<ResponseOnUpdateIntervalDto> {
    return this.scanIntervalService.updateScanInterval(Number(body.interval));
  }
}
