import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
    @Prop({required:true, unique:true})
    email: string;

    @Prop({required:true})
    password: string;

    @Prop()
    newpassword: string

    @Prop()
    id: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
