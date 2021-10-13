import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_URL,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
