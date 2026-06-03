import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: false, versionKey: false })
export class Category extends Document {
    @Prop({required:true, unique:true})
    category: string;
    //  @Prop()
    //     id: string;

}
export const CategorySchema = SchemaFactory.createForClass(Category);
