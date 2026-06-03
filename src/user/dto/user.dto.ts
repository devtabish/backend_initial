import {  IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";



export class UserDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    password: string

    @IsString()
    @IsNotEmpty()
    phoneNo: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsOptional()
    age: string

    @IsString()
    @IsOptional()
    city: string


}