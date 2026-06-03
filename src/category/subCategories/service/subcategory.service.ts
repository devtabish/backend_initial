import { Injectable } from "@nestjs/common";
import { SubCategoryRepository } from "../schema/subcategory.Repo";
import { SubCategoryDto } from "../dto/subcategory.dto";




@Injectable()
export class SubCategoryService {
    constructor(private readonly subcategoryRepo: SubCategoryRepository)
    { }


    async getAll(categoryId: string){
        return this.subcategoryRepo.findbycategory(categoryId)
    }

   async Create(id: string, body: SubCategoryDto) {
    // return await this.subcategoryRepo.create(body, id);
  }

    }
      
    


