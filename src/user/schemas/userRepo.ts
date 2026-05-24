import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { HydratedDocument, Model } from 'mongoose';
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
        return this.userModel.findById({id})
    }
    async findById(_id: string): Promise<UserDocument>{
        return this.userModel.findById({ _id })
    }

    async findByEmail(email:string): Promise<UserDocument>{
       return this.userModel.findOne({email})
    }

    async findByIdAndUpdate(_id: string): Promise<UserDocument>{
        return this.userModel.findOneAndUpdate({ _id })

    }
}

   
    






