import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { SubCategoryRepository } from "../schema/subcategory.Repo";
import { SubCategoryDto } from "../dto/subcategory.dto";
import { CategoryRepository } from "src/category/schema/category.repo";
import { UpdateSubcategoryDto } from "../dto/subcategoryupdatedto.dto";




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

  async deleteSubCategory(id:string){
    try{
      const findSubcategory = await this.subcategoryRepo.findbyId(id)
      if(!findSubcategory){
        throw new NotFoundException('Id not found')
      }
return {findSubcategory,
  message: "SubCategory deleted"
}

    }catch(error){
      throw error
    }
  }

  async updateSubCategoryData( _id: string,  body: UpdateSubcategoryDto) {
          try{
              const { sub_category_name } = body
          const subcategrydata = {}
  
          
          if(sub_category_name){
             subcategrydata['sub_category_name'] =  body.sub_category_name 
          }
    console.log("bodyData", body)
    const updatedSubcategory = await this.subcategoryRepo.findByidandupdate(_id, subcategrydata)
    if (!updatedSubcategory) {
      throw new NotFoundException('User not found');
    }
          
      return updatedSubcategory
          
      }catch (error){
      throw error}
  }

  async addsubCategory( categoryId: string, data: SubCategoryDto){
    try{
       const { sub_category_name } = data
          const addsubcategrydata = {}
  
          
          if(sub_category_name){
             addsubcategrydata['sub_category_name'] =  data.sub_category_name 
          }
      const findSub = await this.subcategoryRepo.findbyName(data.sub_category_name)
      if(findSub){
        throw new ConflictException('subcategory already exists, try other one')
      }
      
      const addSubcat = await this.subcategoryRepo.create({sub_category_name: sub_category_name, categoryId: categoryId})
      return addSubcat
    }catch(error){
      throw error
    }
  }

}
