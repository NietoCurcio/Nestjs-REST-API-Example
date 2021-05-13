import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Cat as CatMongoose, CatDocument } from './schema/cat.schema';
import { Model } from 'mongoose';
import { Owner, ownerDocument } from './schema/owner.schema';
import { CreateCatDto } from './dto/cat.dto';
// responsible for data storage and retrieval, used by catsController

// the @Injectable() decorator attaches metadata, which declares that CatsService
// is a class that can be managed by the Nest IoC, inversion of control, container
// so it can be injected in other classes in the constructor (in other words, is a provider)
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [{ name: 'Molly', age: 2, breed: 'breed' }];

  constructor(
    @InjectModel(CatMongoose.name) private catModel: Model<CatDocument>,
    @InjectModel(Owner.name) private ownerModel: Model<ownerDocument>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = new this.catModel(createCatDto);
    const owner = await this.ownerModel.create({
      firstname: 'Felipe',
      lastname: 'Curcio',
    });
    cat.owner = owner.id;
    cat.friend = { cat: 'Friend Tom' };
    return cat.save();
  }

  async findAll() {
    return this.catModel.find();
  }
}
