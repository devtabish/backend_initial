import { IsNotEmpty, IsString } from "class-validator";


export class AdminDto{

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}