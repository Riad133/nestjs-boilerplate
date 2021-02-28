import { Types } from "mongoose";

export class User {
    _id: Types.ObjectId;
    name:string;
    username:string;
    email:string;
    age: number;
    password:string;
    role:string;
}
