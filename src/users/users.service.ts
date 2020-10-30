import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, User } from "./users.schema";

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(newUser: User): Promise<User> {
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.userModel.findById(userId);
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    return this.userModel.findOne({ phone });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
