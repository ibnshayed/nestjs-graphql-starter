import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsMongoId, IsString } from 'class-validator';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @IsMongoId()
  @Field(() => ID)
  _id: ObjectId;

  @IsString()
  @Prop()
  firstName: string;

  @IsString()
  @Prop()
  lastName: string;

  @IsString()
  @Prop()
  email: string;

  @IsString()
  @Prop()
  username: string;

  @IsString()
  @Prop()
  password: string;

  @IsString()
  @Prop()
  phone: string;

  @IsBoolean()
  @Prop({ default: true })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
