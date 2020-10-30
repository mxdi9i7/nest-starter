import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email?: string;

  @Prop({ unique: true })
  phone?: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
