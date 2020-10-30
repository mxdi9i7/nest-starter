import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User, UserDocument } from "src/users/users.schema";
import { UsersService } from "../users/users.service";
import * as argon from "argon2";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

interface TUserAuth extends User {
  _id?: any;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.userService.findByPhone(phone);
    const isPasswordMatch = await argon.verify(user.password, password);
    if (user && isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: TUserAuth) {
    return {
      access_token: this.jwtService.sign({
        userId: user._id,
      }),
    };
  }

  async signup(newUser: User) {
    const hash = await argon.hash(newUser.password);
    const data = await this.userService.create({ ...newUser, password: hash });
    const token = await this.login(data);
    return token;
  }

  async changePassword({ userId, newPassword }): Promise<any | undefined> {
    const newHash = await argon.hash(newPassword);
    try {
      return await this.userModel.findOneAndUpdate(userId, {
        $set: {
          password: newHash,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
