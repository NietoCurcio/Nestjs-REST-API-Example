import {
  ClassSerializerInterceptor,
  Injectable,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/item.dto';
// import { Item } from './interfaces/cat.interface';
import { Item, ItemDocument } from './schema/item.schema';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [];

  constructor(@InjectModel(Item.name) private ItemModel: Model<ItemDocument>) {}

  findAll(): Item[] {
    return this.items;
  }

  async findOne() {
    return this.ItemModel.findOne({
      name: 'teste',
    });
  }

  create(CreateItemDto): Promise<Item> {
    return this.ItemModel.create(CreateItemDto);
  }

  findById(id): Item {
    return this.items[id];
  }
}
