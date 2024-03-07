import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends OmitType(
  User,
  ['_id', 'status'],
  InputType,
) {}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
}
