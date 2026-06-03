import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ timestamps: false, versionKey: false })
export class SubCategory extends Document {
    @Prop({required:true, unique:true})
    category_name: string;

    @Prop()
    subcategoryid: string

     @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
