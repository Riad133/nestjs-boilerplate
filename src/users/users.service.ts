import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';


import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';



// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<string> {
   
    const bcrypt = require('bcrypt');
    const saltOrRounds =await bcrypt.genSalt();
    const password= createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    let user  = new User();
    user.name= createUserDto.name;
    user.username=createUserDto.username;
    user.email=createUserDto.email;
    user.password=hash;
    user.role=createUserDto.role;
   
    
    const createdUser = new this.userModel(user);
     createdUser.save();
     return "User Create Successfully";
  }

 async findAll():Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(username: string):Promise<User> {
    
    const user = await this.userModel.findOne({username:username}).exec();
   
      if(!user ) {
        throw new UnauthorizedException();
      }
      console.log(user);
      return user;
}

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto):Promise<string> {
     try {
      await this.userModel.findByIdAndUpdate(id,updateUserDto).exec();
      return "Update successfully";
     } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST);
     }
  }

  remove(id: Types.ObjectId) {
    return `This action removes a #${id} user`;
  }
}