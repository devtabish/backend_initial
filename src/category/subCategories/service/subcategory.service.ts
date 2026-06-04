import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { SubCategoryRepository } from "../schema/subcategory.Repo";
import { SubCategoryDto } from "../dto/subcategory.dto";
import { CategoryRepository } from "src/category/schema/category.repo";




@Injectable()
export class SubCategoryService {
    constructor(private readonly subcategoryRepo: SubCategoryRepository, 
        private readonly categoryRepo: CategoryRepository
    )
    { }


    async getAll(){
        return this.subcategoryRepo.findAll()
    }


async addSubCategory(categoryId: string, body: SubCategoryDto) {
  try {
    const findCategory = await this.categoryRepo.findbyid(categoryId)
    console.log("categoryid", findCategory)
    if(!findCategory){
        throw new NotFoundException("category id not found")
    }
    const findSubCategory = await this.subcategoryRepo.findByName(body.sub_category_name);
    console.log("findSubCategory:", findSubCategory);

    if (findSubCategory) {
      throw new ConflictException("This subcategory already exists!");
    }
    const subCategoryInfo = await this.subcategoryRepo.create({
      sub_category_name: body.sub_category_name,
      categoryId: categoryId
    });
    
    return subCategoryInfo;
  } catch (error) {
    throw error;
  }
}

    
      
  }


