import { Controller } from '@nestjs/common';
import { CatsService } from './cats/cats.service';

@Controller('app')
export class AppController {
  // notice that if app.module does not import CatsService provider from CatsModule
  // this provider won't be available in AppModule context to use this provider in its controller
  // to solve, just import CatsModule (that has CatsService provider in its context) to AppModule
  // also be able to has this provider in its context to use in its controller, so Nest will be
  // able to resolve dependency tree of modules

  //   Angular providers are registered in the global scope
  //   Nest, actually, encapsules its providers in its module, *make available elsewhere with @Global*?,
  constructor(private catsService: CatsService) {
    // console.log(catsService.findAll());
  }
}
