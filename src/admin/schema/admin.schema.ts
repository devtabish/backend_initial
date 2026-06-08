import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: false, versionKey: false })
export class Admin extends Document {

     @Prop({ 
    type: String,  
    default: 'admin'          
  })
  role: string; 

    @Prop({required:true, unique:true})
    email: string;

    @Prop({required:true})
    password: string;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);