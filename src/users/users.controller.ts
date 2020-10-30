import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@Query() query: { userId: string }) {
    return this.usersService.findById(query.userId);
  }

  @Get("all")
  async getAllUser() {
    return this.usersService.findAll();
  }
}
