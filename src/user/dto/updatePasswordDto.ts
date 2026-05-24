import { IsString } from "class-validator";



export class UpdatePasswordDto{

    @IsString()
    currentpassword: string

    @IsString()
    newpassword: string
}