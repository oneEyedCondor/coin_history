import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

import { ScanIntervalController } from './scan-interval.controller';
import { ScanIntervalService } from './scan-interval.service';
import { ScanInterval } from './scan-interval.model';

@Module({
  imports: [SequelizeModule.forFeature([ScanInterval]), HttpModule],
  controllers: [ScanIntervalController],
  providers: [ScanIntervalService],
})
export class ScanIntervalModule {}
