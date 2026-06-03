import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./category.schema";
import { CategoryDocument } from "./category.schema";
import { HydratedDocument, Model } from "mongoose";
import { CategoryDto } from "../dto/category.dto";


@Injectable()
export class CategoryRepository 
 {
constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>){}

  async create(createCategoryData: Partial<CategoryDocument>): Promise<HydratedDocument<CategoryDocument>>{
    const newCategory = await this.categoryModel.create(createCategoryData)

    return newCategory;
}

async findCategory(id: string): Promise<CategoryDocument>{
   const user =  await this.categoryModel.findOne({_id: id})
   console.log("userrrrrrr",user)
   return user
}

async findbyid(id: string): Promise<CategoryDocument | null>{
    return await this.categoryModel.findById(id).exec()
}

async findall(): Promise<CategoryDocument[]>{
    return await this.categoryModel.find().exec()
}

async findone(name: CategoryDto): Promise<CategoryDocument | null>{
    return await this.categoryModel.findById(name).exec()
}

}