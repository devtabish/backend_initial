import { Prop } from "@nestjs/mongoose";
import { IsMongoId } from "class-validator";


export class SubCategoryDeleteIdDto{

    @Prop()
    @IsMongoId()
    SubCategoryId: string
}