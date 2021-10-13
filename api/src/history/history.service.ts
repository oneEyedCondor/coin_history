import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { format } from 'date-fns';

import { PriceHistory } from './price-history.model';
import { ResponseOnGetHistoryDto } from './dto/response-on-get-history.dto';
import { QueryStringLimitOffsetSortDto } from '../shared/dto/query-string-limit-offset-sort.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(PriceHistory) private priceHistoryModel: typeof PriceHistory,
  ) {}

  async getHistory(
    query: QueryStringLimitOffsetSortDto,
  ): Promise<ResponseOnGetHistoryDto> {
    let { limit, offset, sortBy = 'createdAt', sortOrder = 'ASC' } = query;

    if (sortBy === 'date') {
      sortBy = 'createdAt';
    }

    try {
      const { rows: fetchedPriceHistory, count } =
        await this.priceHistoryModel.findAndCountAll({
          raw: true,
          offset,
          limit,
          order: [[sortBy, sortOrder]],
        });

      return {
        isError: false,
        message: `Fetched price history`,
        objects:
          fetchedPriceHistory.map((h) => ({
            date: format(h.createdAt, 'dd-MM-yyyy hh:mm:ss'),
            price: h.price,
          })) || [],
        pagination: {
          limit: +limit,
          offset: +offset,
          count: count,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          isError: true,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
