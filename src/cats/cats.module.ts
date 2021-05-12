import { Global, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CustomModule } from './customProviders.module';
import { DynamicModuleConfig } from '../dynamicModule/dynamic.module';
import { Cat, CatSchema } from './schema/cat.schema';
import { Owner, OwnerSchema } from './schema/owner.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from 'src/dynamicModule/config.service';

// making cats providers available everywhere, should be registered only once
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
  imports: [
    CustomModule,
    // MongooseModule.forFeature([
    //   { name: Cat.name, schema: CatSchema },
    //   { name: Owner.name, schema: OwnerSchema },
    // ]),
    MongooseModule.forFeatureAsync([
      {
        name: Cat.name,
        imports: [DynamicModuleConfig.register({ folder: './config' })],
        useFactory: (config: ConfigService) => {
          const schema = CatSchema;
          schema.plugin(require('mongoose-autopopulate'));
          schema.pre('save', function () {
            console.log(`${config.get('FELIPE')}: Hello from pre save on Cats`);
          });
          return schema;
        },
        inject: [ConfigService],
      },
      { name: Owner.name, useFactory: () => OwnerSchema },
    ]),
  ],
  //   exporting the instance of catsservice to other modules
})
export class CatsModule {}
