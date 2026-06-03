import { Admin, AdminDocument } from '../../admin/schema/admin.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { AdminDto } from '../dto/admindto';
// import { BaseRepository } from 'src/common/repositories/base.repository';
// import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminRepository {
    constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>){}


     async createAdmin(createAdminData: Partial<AdminDocument>): Promise<HydratedDocument<AdminDocument>>{
    const newAdmin = new this.adminModel(createAdminData)
    return newAdmin.save();
}

async findbyemail(email: string): Promise<AdminDocument>{
    return await this.adminModel.findOne({email})
}
}