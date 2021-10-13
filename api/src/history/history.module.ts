import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { PriceHistory } from './price-history.model';

@Module({
  imports: [SequelizeModule.forFeature([PriceHistory])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
