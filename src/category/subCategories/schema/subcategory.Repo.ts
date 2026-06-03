import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model, Types } from "mongoose";
import { SubCategory, SubCategoryDocument } from "./subcategory.schema";
import { Category, CategoryDocument } from "src/category/schema/category.schema";
import { SubCategoryDto } from "../dto/subcategory.dto";


@Injectable()
export class SubCategoryRepository 
 {
constructor(@InjectModel(SubCategory.name) private categoryModel: Model<SubCategoryDocument>){}

  async create(id: string, body: SubCategoryDto): Promise<HydratedDocument<SubCategoryDocument>>{
    const newSubCategory = await this.categoryModel.create({...body,
        category: new Types.ObjectId(body.category)
    })
    return newSubCategory.save();
}

    async findbycategory(categoryId: string): Promise<SubCategoryDocument[]>{
        return await this.categoryModel.find({category: new Types.ObjectId(categoryId)}).exec()
    }

    async findbyid(id: string): Promise<SubCategoryDocument>{
        return await this.categoryModel.findById(id).populate('category').exec()
    }
    }

