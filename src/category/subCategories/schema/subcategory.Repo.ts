import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model, Types } from "mongoose";
import { SubCategory, SubCategoryDocument } from "./subcategory.schema";
import { Category, CategoryDocument } from "src/category/schema/category.schema";
import { SubCategoryDto } from "../dto/subcategory.dto";


@Injectable()
export class SubCategoryRepository 
 {
constructor(@InjectModel(SubCategory.name) private subcategoryModel: Model<SubCategoryDocument>){}




async create(data: { sub_category_name: string; categoryId: string }): Promise<SubCategoryDocument> {
    const newSubCat = new this.subcategoryModel({
      sub_category_name: data.sub_category_name,
      categoryId: new Types.ObjectId(data.categoryId), // Safe conversion to Mongo ObjectId
    });
    return await newSubCat.save();
  }


  async findByName(name: string): Promise<SubCategoryDocument | null> {
  return await this.subcategoryModel.findOne({ 
    sub_category_name: { $regex: new RegExp(`^${name}$`, 'i') } 
  }).exec();
}


    async findbyid(id: string): Promise<SubCategoryDocument>{
        return await this.subcategoryModel.findById({_id: id}).populate('categoryId').exec()
    }

    async findAll(): Promise<SubCategoryDocument[]> {
    return await this.subcategoryModel.find().populate('categoryId') .exec();
  }
    }

    // this.subcategoryModel.collection.dropIndex('name_1')
    //   .then(() => {
    //     console.log('old index deleted');
    //   })
    //   .catch((error) => {
    // 
    //     console.log('Index check clean!');
    //   });

