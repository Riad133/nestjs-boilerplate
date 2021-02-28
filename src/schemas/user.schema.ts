import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;
  @Prop()
  name: string;
  @Prop()
  username: string;

  @Prop()
  age: number;

  @Prop()
  email: string;
  
  @Prop()
  password:string;
  @Prop()
  role :string;
}

export const UserSchema = SchemaFactory.createForClass(User);