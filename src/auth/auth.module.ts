import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../security/constants';
import { LocalStrategy } from 'src/security/local.strategy';
import { JwtStrategy } from 'src/security/jwt.strategy';


@Module({
  imports: [
    forwardRef(() => UsersModule),
     
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expire_time },
      
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}