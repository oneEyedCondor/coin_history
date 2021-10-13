import { Controller, Get, Query } from '@nestjs/common';

import { HistoryService } from './history.service';
import { ResponseOnGetHistoryDto } from './dto/response-on-get-history.dto';
import { QueryStringLimitOffsetSortDto } from '../shared/dto/query-string-limit-offset-sort.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  getHistory(
    @Query() query: QueryStringLimitOffsetSortDto,
  ): Promise<ResponseOnGetHistoryDto> {
    return this.historyService.getHistory(query);
  }
}
