import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/cat.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id): Item {
    return this.items[id];
  }
}
