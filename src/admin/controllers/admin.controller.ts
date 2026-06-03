import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { Public } from "src/customkey";
import { AdminService } from "../service/admin.service";
import { AdminDto } from "src/admin/dto/admindto";
import { Roles } from "src/Roles/roles.decorator";
import { Role } from "src/Roles/role.enum";
import { AuthGuard } from "src/auth/authGuard";



@Controller('admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){}

    @Public()
    @Roles(Role.Admin)
        @Post('adminSignup')
        ceateAdmin(@Body() body: AdminDto){
            return this.adminService.signupAdmin(body)
        }

        @Public()
        @Roles(Role.Admin)
        @Post('adminLogin')
        loginAdmin(@Body() body: AdminDto){
            console.log(body)
            return this.adminService.loginAdmin(body)
        }
}