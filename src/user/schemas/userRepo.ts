import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { HydratedDocument, Model } from 'mongoose';
import { UpdateUserDto } from '../dto/updatedataDto';
import { UpdatePasswordDto } from '../dto/updatePasswordDto';
import { AdminDocument } from '../../admin/schema/admin.schema';
// import { BaseRepository } from 'src/common/repositories/base.repository';
// import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class UserRepository 
 {
constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

  async create(createUserData: Partial<UserDocument>): Promise<HydratedDocument<UserDocument>>{
    const newUser = new this.userModel(createUserData)
    return newUser.save();
}
    


    async findAllUsers(): Promise<UserDocument[]>{
        return this.userModel.find()
    }

    async findByIID(id:string): Promise<UserDocument>{
        const user =  await this.userModel.findOne({_id:id})
        return user
    }
    async findById(_id: string): Promise<UserDocument>{
        return this.userModel.findOne({ _id })
    }

    async findByEmail(email:string): Promise<UserDocument>{
       return this.userModel.findOne({email})
    }

    async findByIdAndUpdate(_id: string, data: UpdateUserDto): Promise<UserDocument>{
        return this.userModel.findByIdAndUpdate(_id,
     {$set: data},   // use $set to only update provided fields
     {new: true} )
    }

    
}

   
    






