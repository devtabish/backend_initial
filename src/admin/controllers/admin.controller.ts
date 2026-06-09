import { Controller, Post, Body, UseGuards, Param, Delete } from "@nestjs/common";
import { Public } from "customkey";
import { AdminService } from "../service/admin.service";
import { AdminDto } from "src/admin/dto/admindto";
import { Roles } from "src/Roles/roles.decorator";
import { Role } from "src/Roles/role.enum";
import { AuthGuard } from "src/auth/authGuard";
import { AdminIdDto } from "../dto/adminIddto.dto";
import { AdminAuthGuard } from "src/auth/adminAuth";



@Controller('admin')
@UseGuards(AdminAuthGuard)
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

        @Roles(Role.Admin)
        @Delete('delete/:adminId')
            dletCategory(@Param() params: AdminIdDto){
                return this.adminService.deleteCategory(params.adminId)
            }
}