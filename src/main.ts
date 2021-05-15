import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './exceptionFilters';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.use(logger); //to bind middleware to all routes
  // app.useGlobalFilters(new HttpExceptionFilter()); // global filter, controller-filter, method-filter
  // nest already has a default BaseExceptionFilter, to customize a global filter to catch everything
  // you'll have to extend it https://docs.nestjs.com/exception-filters#inheritance, in the this example we
  // are setting a HttpExceptionFilter as global, not the Base
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
