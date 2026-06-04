import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SubCategoryService } from "../service/subcategory.service";
import { SubCategoryDto } from "../dto/subcategory.dto";
import { SubCategoryIdDto } from "../dto/subcategoryId.dto";

@Controller('sub-categories')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

 @Post('add/:categoryId') 
  async addSubCategory(
    @Param() params: SubCategoryIdDto, 
    @Body() body: SubCategoryDto
  ) {
    return this.subCategoryService.addSubCategory(params.categoryId, body);
  }

  @Get('all')
  getAll(){
    return this.subCategoryService.getAll()
  }
}