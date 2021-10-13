import { Controller, Put, Body } from '@nestjs/common';

import { TaskSchedulingService } from './task-scheduling.service';
import { UpdateIntervalDto } from './dto/update-interval.dto';
import { ResponseOnUpdateIntervalDto } from './dto/response-on-update-interval.dto';

@Controller('task-scheduling')
export class TaskSchedulingController {
  constructor(private readonly taskSchedulingService: TaskSchedulingService) {}

  @Put()
  async changeScanInterval(
    @Body() body: UpdateIntervalDto,
  ): Promise<ResponseOnUpdateIntervalDto> {
    return this.taskSchedulingService.changeScanInterval(body.interval);
  }
}
