import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @IsMongoId()
  @Field(() => ID)
  _id: ObjectId | Types.ObjectId;

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
  @IsNotEmpty()
  @Prop({ select: false })
  password: string;

  @IsString()
  @Prop()
  phone: string;

  @IsBoolean()
  @Prop({ default: true })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', function (next: Function) {
  const user = this;
  if (user.password) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  }
});
