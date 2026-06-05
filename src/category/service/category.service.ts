import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepository } from "../schema/category.repo";
import { CategoryDto } from "../dto/category.dto";
import { Category } from "../schema/category.schema";
import { NotFoundError } from "rxjs";
import { SubCategoryRepository } from "../subCategories/schema/subcategory.Repo";




@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepo: CategoryRepository, 
     private readonly subcategoryRepo: SubCategoryRepository
    )
    {}

    async addCategory(  body: CategoryDto){
        try{
            const findCategory = await this.categoryRepo.findByName(body.name)
             console.log("findcategory",findCategory)
       if(findCategory){
        throw new ConflictException("This category already exists, try other one")
       }  
        const categoryInfo = await this.categoryRepo.create(body)
       
        return categoryInfo
        }catch(error){
            throw error
        }
       
             
    }

    async deleteCategory(categoryId: string){
        try{
            const findCat = await this.categoryRepo.findbyid(categoryId)
            console.log("categoryid", findCat)
        if(!findCat){
        throw new NotFoundException('Category not found')
    }
    const dletcat = await this.categoryRepo.findbyidanddelete(categoryId)
    return {
            dletcat,
            message: "Category deleted successfully"
        }
        }catch(error){
            throw error
        }
        
        
    }
    

    async findall(){
        return await this.categoryRepo.findall();
    }

    async findone(id: string){
        const category =  await this.categoryRepo.findbyid(id)
        if(!category){
            throw new NotFoundException("Category not found")
        }
        return category
    }


}