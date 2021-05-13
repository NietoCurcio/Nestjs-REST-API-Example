import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ItemDocument = Item & mongoose.Document;

// We can also define a schema in the "stantard" way as "new mongoose.Schema({...})""
@Schema()
export class Item {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  _property: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
