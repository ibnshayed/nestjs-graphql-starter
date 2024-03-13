import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, Types } from 'mongoose';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserInput: CreateUserInput) {
    return this.userModel.create(createUserInput);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(
    user: Partial<User>,
    projection?: string,
    options?: QueryOptions,
  ): Promise<User> {
    return this.userModel.findOne({ ...user }, projection, options);
  }

  update(id: Types.ObjectId, updateUserInput: UpdateUserInput): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true });
  }

  remove(id: Types.ObjectId): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
