import { IsMongoId, IsNotEmpty, IsString } from "class-validator";



export class SubCategoryDto{
    @IsString()
    @IsNotEmpty()
    sub_category_name:string
}