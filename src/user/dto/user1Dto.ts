import { IsString } from "class-validator";



export class user1Dto {
    @IsString()
    oldpassword: string

    @IsString()
    newpassword: string

    @IsString()
    id: string
}