import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.API_URL,
  });

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () =>
    console.log(`Cron service started on port ${PORT}`),
  );
}
bootstrap();
