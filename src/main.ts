import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger); //to bind middleware to all routes
  // app.useGlobalFilters(new HttpExceptionFilter()); global filter, controller-filter, method-filter
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.useGlobalPipes(new ValidationPipe());
  console.log('lembra da porta no main');
  console.log(port);
  await app.listen(3001);
}
bootstrap();
