import { IsMongoId, IsNotEmpty } from "class-validator";


export class SubCategoryIdDto{

    @IsMongoId()
    @IsNotEmpty()
    categoryId: string

}