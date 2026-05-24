import {  IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";



export class UserDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    password: string
    
    @IsOptional()
    @IsString()
    _id: string


}