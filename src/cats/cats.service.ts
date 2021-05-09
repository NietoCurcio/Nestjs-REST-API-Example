import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
// responsible for data storage and retrieval, used by catsController

// the @Injectable() decorator attaches metadata, which declares that CatsService
// is a class that can be managed by the Nest IoC, inversion of control, container
// so it can be injected in other classes in the constructor (in other words, is a provider)
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Array<Cat> {
    // Cat[] or Array<Cat> (declaring array types)
    return this.cats;
  }
}
