import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from './dynamicModule/config.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.get('MONGO_URI'),
    };
  }
}
