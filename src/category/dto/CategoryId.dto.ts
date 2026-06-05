import { Prop } from "@nestjs/mongoose";
import { IsMongoId, IsNotEmpty } from "class-validator";


export class CategoryIdDto{

    @Prop()
    @IsNotEmpty()
    @IsMongoId()
    categoryId: string
}