import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserInput: CreateUserInput) {
    return this.userModel.create(createUserInput);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: Types.ObjectId) {
    return this.userModel.findById(id);
  }

  update(id: Types.ObjectId, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true });
  }

  remove(id: Types.ObjectId) {
    return this.userModel.findByIdAndDelete(id);
  }
}
