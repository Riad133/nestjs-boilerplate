import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { Types } from "mongoose";
import { HttpExceptionFilter } from "src/utility/http-exception.filter";
import { ParseObjectIdPipe } from "src/utility/validation.pipe";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@UseFilters(new HttpExceptionFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) :Promise<string>{
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll():Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':username')
 async findOne(@Param('username') username: string): Promise<User>{
    return await this.userService.findOne(username);
  }

  @Put(':id')
  async update(@Param('id',ParseObjectIdPipe) id: Types.ObjectId, @Body() updateUserDto: UpdateUserDto) :Promise<string>{
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseObjectIdPipe) id: Types.ObjectId) {
    return this.userService.remove(id);
  }
}