import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./category.schema";
import { CategoryDocument } from "./category.schema";
import { HydratedDocument, Model } from "mongoose";
import { CategoryDto } from "../dto/category.dto";
import { find } from "rxjs";
import { SubCategoryDocument } from "../subCategories/schema/subcategory.schema";


@Injectable()
export class CategoryRepository 
 {
constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>){ }

  async create(data: CategoryDto): Promise<CategoryDocument> {
    const newCategory = new this.categoryModel(data)

    return await newCategory.save();
}

async findCategory(id: string): Promise<CategoryDocument>{
   const user =  await this.categoryModel.findOne({_id: id})
   console.log("userrrrrrr",user)
   return user
}

async findbyid(id: string): Promise<CategoryDocument | null>{
    return await this.categoryModel.findById(id).exec()
}

async findbyidanddelete(id: string): Promise<CategoryDocument | null>{
    return await this.categoryModel.findOneAndDelete({_id:id}).exec()
}

async findall(): Promise<CategoryDocument[]>{
    return await this.categoryModel.find().populate('subCategories').exec()
}

async findone(_id: string): Promise<CategoryDocument>{
    const getCat =  await this.categoryModel.findOne({_id: _id})
    console.log("finddddddd", getCat)
    return getCat
}

 async findByName(name: string): Promise<CategoryDocument | null> {
  return await this.categoryModel.findOne({ 
    name: { $regex: new RegExp(`^${name}$`, 'i') } 
  }).exec();
}

}