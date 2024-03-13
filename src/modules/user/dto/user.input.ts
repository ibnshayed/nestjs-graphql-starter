import {
  Field,
  ID,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends OmitType(
  User,
  ['_id', 'status'],
  InputType,
) {}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsMongoId()
  @Field(() => ID)
  id: Types.ObjectId;
}

@ObjectType()
export class UserWithoutPassword extends OmitType(User, ['password']) {}
