import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer/customer.service';

import { HttpExceptionFilter } from './utility/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.lq2gk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

@Module({
  imports: [UsersModule,MongooseModule.forRoot(uri), AuthModule],
  controllers: [AppController, CustomerController],
  providers: [AppService,CustomerService,HttpExceptionFilter,],
  

})
export class AppModule {}
