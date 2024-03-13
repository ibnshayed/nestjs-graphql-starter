import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { CreateUserInput, UpdateUserInput, UserWithoutPassword } from './dto/user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [UserWithoutPassword], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserWithoutPassword, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.userService.findOne({ _id: id });
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserWithoutPassword)
  removeUser(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.userService.remove(id);
  }
}
