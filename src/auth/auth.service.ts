import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AppConfiguration } from 'read-appsettings-json';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
 
  async validateUser(username: string, pass: string): Promise<any> {
    const bcrypt = require('bcrypt');
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass,  user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: User) {
    const payload = { username: user.username, sub: user._id, roles:user.role };
    return {
      access_token: this.jwtService.sign(payload),
      grant_type:'Bearer',
      expire_time:AppConfiguration.Setting().access_token_time
    };
  }

}