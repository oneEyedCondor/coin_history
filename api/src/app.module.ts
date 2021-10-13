import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { HistoryModule } from './history/history.module';
import { ScanIntervalModule } from './scan-interval/scan-interval.module';
import { PriceHistory } from './history/price-history.model';
import { ScanInterval } from './scan-interval/scan-interval.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [PriceHistory, ScanInterval],
      autoLoadModels: true,
    }),
    HistoryModule,
    ScanIntervalModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
