import { IsOptional, IsString } from "class-validator";
import { AtLeastOneField } from "src/auth/atLeastOneField";

@AtLeastOneField(['sub_category_name'])
export class UpdateSubcategoryDto{

    @IsString()
    @IsOptional()
    sub_category_name?: string
}