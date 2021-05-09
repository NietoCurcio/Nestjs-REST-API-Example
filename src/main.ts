import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger) to bind middleware to all routes
  // app.useGlobalFilters(new HttpExceptionFilter()); global filter, controller-filter, method-filter
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
