import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Owner } from './owner.schema';

export type CatDocument = Cat & mongoose.Document;

// We can also define a schema in the "stantard" way as "new mongoose.Schema({...})""
@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    autopopulate: true,
  })
  owner: Owner[];

  @Prop(raw({ friend: { type: String } }))
  friend: Record<string, any>;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
