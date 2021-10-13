import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';
import { Timeout, SchedulerRegistry, CronExpression } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';

import { ResponseOnUpdateIntervalDto } from './dto/response-on-update-interval.dto';
import { PriceHistory } from '../models/price-history.model';

@Injectable()
export class TaskSchedulingService {
  private readonly logger = new Logger(TaskSchedulingService.name);

  constructor(
    @InjectModel(PriceHistory) private priceHistoryModel: typeof PriceHistory,
    private readonly httpService: HttpService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @Timeout(0)
  private runCron(): void {
    const job = new CronJob(CronExpression.EVERY_MINUTE, async () => {
      this.httpService
        .get(
          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
          {
            headers: {
              'X-CMC_PRO_API_KEY': process.env.CRYPTO_API_KEY,
            },
            params: { id: '1' },
          },
        )
        .subscribe(
          ({ status, data: response }) => {
            if (status !== HttpStatus.OK) return;

            const btc = response?.data[1];
            const btcPrice = btc?.quote.USD.price;

            btcPrice &&
              this.priceHistoryModel.create({
                price: btcPrice,
              });
          },
          (err) => {
            this.logger.error(err);
          },
        );
    });

    this.schedulerRegistry.addCronJob('price-scan', job);
    job.start();
  }

  changeScanInterval(scanInterval: number): ResponseOnUpdateIntervalDto {
    try {
      const job = this.schedulerRegistry.getCronJob('price-scan');

      let cronTime = CronExpression.EVERY_MINUTE;
      switch (scanInterval / 60000) {
        case 30:
          cronTime = CronExpression.EVERY_30_MINUTES;
          break;
        case 60:
          cronTime = CronExpression.EVERY_HOUR;
          break;
      }

      job.setTime(new CronTime(cronTime));
      job.start();

      return {
        isError: false,
        message: `Updated`,
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
