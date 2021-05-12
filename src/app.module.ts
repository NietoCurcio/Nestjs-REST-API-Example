import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  Global,
} from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { logger } from './logger.middleware';
import { CatsController } from './cats/cats.controller';
import { ItemsController } from './items/items.controller';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose.service';
import { DynamicModuleConfig } from './dynamicModule/dynamic.module';

@Module({
  providers: [MongooseConfigService],
  controllers: [AppController, ItemsController],
  imports: [
    CatsModule,
    ItemsModule,
    DynamicModuleConfig.register({ folder: './config' }),
    MongooseModule.forRootAsync({
      imports: [DynamicModuleConfig.register({ folder: './config' })],
      useClass: MongooseConfigService,
    }),
  ],
})
export class AppModule implements NestModule {
  // middleware are placed here, not in @module decorator
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      // apply(cors(), helmet(), logger).forRoutes(CatsController)
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);
  }
}
