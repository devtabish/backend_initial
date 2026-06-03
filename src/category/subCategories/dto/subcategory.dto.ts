import { IsMongoId, IsNotEmpty, IsString } from "class-validator";



export class SubCategoryDto{
    @IsString()
    @IsNotEmpty()
    subcategory:string

    @IsMongoId()
    @IsNotEmpty()
    category: string
}