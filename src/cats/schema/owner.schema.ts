import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ownerDocument = Owner & Document;

@Schema()
export class Owner {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
