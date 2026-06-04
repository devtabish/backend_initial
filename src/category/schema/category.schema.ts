import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: false, versionKey: false, autoIndex: true })
export class Category extends Document {
    @Prop({required:true, unique:true})
    name: string;
    //  @Prop()
    //     id: string;

}
export const CategorySchema = SchemaFactory.createForClass(Category);
