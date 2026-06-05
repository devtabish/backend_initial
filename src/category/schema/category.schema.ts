import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document, Types } from 'mongoose';
import { SubCategory } from '../subCategories/schema/subcategory.schema';
import { Type } from 'class-transformer';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: false, versionKey: false, autoIndex: true,toJSON: { virtuals: true },
  toObject: { virtuals: true } })
export class Category extends Document {
    @Prop({required:true, unique:true})
    name: string;
    //  @Prop()
    //     id: string;

}
export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.virtual('subCategories', {
  ref: 'SubCategory',          // Kis model se data uthana hai
  localField: '_id',           // Category ka apna field
  foreignField: 'categoryId',  // SubCategory ke andar ka field jo link hai
});

CategorySchema.pre('findOneAndDelete', async function (this: mongoose.Query<any, any>) {
  try {
    const queryFilter = this.getFilter();
    const rawId = queryFilter._id || queryFilter;

    if (!rawId) {
      console.log("targetId not found");
      return;
    }
    const targetId = typeof rawId === 'string' ? new Types.ObjectId(rawId) : rawId;
    console.log("Converted targetId for MongoDB:", targetId);

    const relatedModel = this.model.db.model('SubCategory');

    const result = await relatedModel.deleteMany({ categoryId: targetId });
    
    console.log(`Cascade Delete Successful! ${result.deletedCount} subcategories saaf ho gaein.`);
  } catch (error) {
    console.error("Cascade Delete Hook ", error);
    throw error;
  }
});