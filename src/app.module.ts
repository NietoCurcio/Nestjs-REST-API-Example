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
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  providers: [MongooseConfigService],
  controllers: [AppController, ItemsController],
  imports: [
    CatsModule,
    ItemsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./src/config/development.env'],
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AuthModule,
    UsersModule,
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
