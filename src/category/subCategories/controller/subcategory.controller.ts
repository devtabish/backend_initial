import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { SubCategoryService } from "../service/subcategory.service";
import { SubCategoryDto } from "../dto/subcategory.dto";
import { SubCategoryIdDto } from "../dto/subcategoryId.dto";
import { SubCategoryDeleteIdDto } from "../dto/subcategorydeleteIddto.dto";
import { UpdateSubcategoryDto } from "../dto/subcategoryupdatedto.dto";

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
  @Delete('delete/:SubCategoryId')
  deletSubCategory(@Param() params: SubCategoryDeleteIdDto){
    return this.subCategoryService.deleteSubCategory(params.SubCategoryId)
  }

      @Put('update/:SubCategoryId')
      async updateUser(@Param() params: SubCategoryDeleteIdDto,
          @Body() updateSubcategory: UpdateSubcategoryDto,
      ) {
          const updated = await this.subCategoryService.updateSubCategoryData( params.SubCategoryId, updateSubcategory);
          if (!updated) throw new NotFoundException('User not found');
          return updated;
      }

      @Put('addanothersubCategory/:SubCategoryId')
      async addsubcategory(@Param() params: SubCategoryDeleteIdDto,
    @Body() body: SubCategoryDto){
      return this.subCategoryService.addsubCategory(params.SubCategoryId, body)
    }
}