import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { Role } from 'src/auth/role.enum';

export type UserDocument = User & mongoose.Document;

// We can also define a schema in the "stantard" way as "new mongoose.Schema({...})""
@Schema()
export class User {
  @Prop({ unique: true })
  @IsString()
  username: string;

  @Prop()
  @IsString()
  password: string;

  @Prop({ default: [Role.User] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
