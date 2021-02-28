import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
    getCustomer():string {
        return "Jhon";
    }
    async getAllCustomer(): Promise<any[]>{
        let name: string []=[];
        name.push('Jhone');
        name.push('Tom');
        name.push('Jerry');
        name.push('Akash')
        return name;
    }
}
