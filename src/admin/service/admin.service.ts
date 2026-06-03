import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
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
    
            let hash = await bcrypt.hash(body.password, 10)
            hash = body.password
            const adminInfo = await this.adminRepo.createAdmin(body )
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
                    
                    if (userExists.password !== data.password) {
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
        

    }