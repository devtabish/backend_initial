import { Prop } from "@nestjs/mongoose";
import { IsMongoId, IsNotEmpty } from "class-validator";


export class AdminIdDto{

    @Prop()
    @IsNotEmpty()
    @IsMongoId()
    adminId: string
}