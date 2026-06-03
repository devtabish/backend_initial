import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SubCategoryService } from "../service/subcategory.service";
import { SubCategoryDto } from "../dto/subcategory.dto";

@Controller('sub-categories')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post('/')
  create( @Param(':id') id: string
     ,@Body() body: SubCategoryDto) {
    return this.subCategoryService.Create(id, body);
  }

  @Get('all')
  getAll(@Param(':id') id: string){
    return this.subCategoryService.getAll(id)
  }
}