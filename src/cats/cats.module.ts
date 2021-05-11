import { Global, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CustomModule } from './customProviders.module';
import { DynamicModuleConfig } from '../dynamicModule/dynamic.module';

// making cats providers available everywhere, should be registered only once
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
  imports: [CustomModule, DynamicModuleConfig.register({ folder: './config' })],
  //   exporting the instance of catsservice to other modules
})
export class CatsModule {}
