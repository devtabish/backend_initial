import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: false, versionKey: false })
export class User extends Document {

    @Prop({ 
    type: String,  
    default: 'user'          
  })
  role: string; 

  @Prop({required: true, unique: true})
  email: string

    @Prop({required:true})
    password: string;

    @Prop()
    id: string;

    @Prop({required:true})
    phoneno: string

    @Prop({required: true})
    address: string

    @Prop()
    age: string

    @Prop()
    city: string

}

export const UserSchema = SchemaFactory.createForClass(User);
