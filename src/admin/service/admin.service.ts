import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { AdminRepository } from "../schema/admin.repo"
import { AdminDto } from "../../admin/dto/admindto"
import * as bcrypt from 'bcrypt'
import { AdminDocument } from "../schema/admin.schema"
import { JwtService } from "@nestjs/jwt"


@Injectable()
export class AdminService {
    constructor(private readonly adminRepo: AdminRepository, private jwtService: JwtService)
    { }


    async signupAdmin(body: AdminDto){

        const adminCount = await this.adminRepo.countAdmins({ role: 'admin' });
    
    if (adminCount > 0) {
        throw new BadRequestException('Registration Forbidden: System already has its own admin');
    }
        const findadmin = await this.adminRepo.findbyemail(body.email)
        if(findadmin){
            throw new BadRequestException('admin already exists')
        }
    
            const hash = await bcrypt.hash(body.password, 10)
            const admindata = {
                ...body, password: hash
            }
            const adminInfo = await this.adminRepo.createAdmin(admindata )
            adminInfo.save()
            return {
                    adminInfo, message: "admin created"
                }
            
        }

        async loginAdmin(data: AdminDto): Promise<{ access_token: string, user: AdminDocument}> {
                try {
                    const userExists = await this.adminRepo.findbyemail(data.email);
                    console.log("userExists", userExists)
                    console.log("data", data)
                    if (!userExists) {
                        throw new NotFoundException("user not found, register first")
                    }
                    const isMatch = await bcrypt.compare(data.password, userExists.password)
                    
                    if (!isMatch) {
                        throw new UnauthorizedException("wrong password")
                    }
                    // const userData = userExists.toObject()
                    const payload = { user: userExists};
                    const access_token = await this.jwtService.signAsync(payload)
                    // delete userData.password && delete userData._id
                    
                    
                    return {
                        access_token,
                        user: userExists,
                    };
                }
                catch (error) {
                    console.log({ error })
        
                    throw error
        
                }
        
            }

            async deleteCategory(adminId: string){
                    try{
                        const findadmin = await this.adminRepo.findbyid(adminId)
                    if(!findadmin){
                    throw new NotFoundException('Category not found')
                }
                const deleteAdmin = await this.adminRepo.findbyidanddelete(adminId)
                return {
                        deleteAdmin,
                        message: "Admin deleted successfully"
                    }
                    }catch(error){
                        throw error
                    }
                }
        

    }