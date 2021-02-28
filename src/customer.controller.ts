import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { CreateUserDto } from './users/dto/create-user.dto';



@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getHello(@Query() query: { name: string, id: string }) {
    return `Hello ${query.name}, your ID is ${query.id}`;
  }
  @Get("all")
  async getAllCustomer():Promise<any[]>{
      
      return await this.customerService.getAllCustomer();
  }
  @Post('create')
  async create(): Promise<any> {
    return 'hellod w';
  }
 
  @Put()
  update(@Query() query: { name: string, id: string }) {
     return `Hello ${query.name}, your ID is ${query.id}`;
  }



  
}