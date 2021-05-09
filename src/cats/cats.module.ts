import { Global, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// making cats providers available everywhere, should be registered only once
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
  //   exporting the instance of catsservice to other modules
})
export class CatsModule {}
