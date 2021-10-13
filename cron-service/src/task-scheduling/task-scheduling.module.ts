import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

import { TaskSchedulingController } from './task-scheduling.controller';
import { TaskSchedulingService } from './task-scheduling.service';
import { PriceHistory } from '../models/price-history.model';

@Module({
  imports: [
    SequelizeModule.forFeature([PriceHistory]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [TaskSchedulingController],
  providers: [TaskSchedulingService],
})
export class TaskSchedulingModule {}
