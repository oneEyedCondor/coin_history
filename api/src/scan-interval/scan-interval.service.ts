import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';
import { throwError } from 'rxjs';

import { ScanInterval } from './scan-interval.model';
import { ResponseOnGetIntervalDto } from './dto/response-on-get-interval.dto';
import { ResponseOnUpdateIntervalDto } from './dto/response-on-update-interval.dto';
import { error } from 'console';

@Injectable()
export class ScanIntervalService {
  constructor(
    @InjectModel(ScanInterval) private scanIntervalModel: typeof ScanInterval,
    private readonly httpService: HttpService,
  ) {}

  private async createInitialInterval() {
    return this.scanIntervalModel.create({
      id: 1,
      interval: 60000,
    });
  }

  async getScanInterval(): Promise<ResponseOnGetIntervalDto> {
    try {
      let fetchedScanInterval = await this.scanIntervalModel.findByPk(1);

      if (!fetchedScanInterval) {
        fetchedScanInterval = await this.createInitialInterval();
      }

      return {
        isError: false,
        message: `Fetched scan interval`,
        object: {
          interval: fetchedScanInterval.interval,
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

  async updateScanInterval(
    scanInterval: number,
  ): Promise<ResponseOnUpdateIntervalDto> {
    try {
      if (![60000, 1800000, 3600000].includes(scanInterval)) {
        throw new HttpException(
          {
            isError: true,
            message: 'Interval must be equal to 60000, 1800000 or 3600000',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      let fetchedScanInterval = await this.scanIntervalModel.findByPk(1);

      if (!fetchedScanInterval) {
        fetchedScanInterval = await this.createInitialInterval();
      }

      return this.httpService
        .put(`${process.env.CRON_SERVICE_URL}/task-scheduling`, {
          interval: scanInterval,
        })
        .toPromise()
        .then(async ({ data: { isError } }) => {
          if (!isError) {
            fetchedScanInterval.interval = scanInterval;
            await fetchedScanInterval.save({ fields: ['interval'] });

            return {
              isError: false,
              message: `Scan interval updated`,
              object: {
                interval: scanInterval,
              },
            };
          }
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      if (
        error.status === HttpStatus.BAD_REQUEST ||
        error.status === HttpStatus.NOT_FOUND
      ) {
        throw error;
      }

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
