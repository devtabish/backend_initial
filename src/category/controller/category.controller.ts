import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { Public } from "customkey";
import { CategoryDto } from "../dto/category.dto";
import { AuthGuard } from "src/auth/authGuard";
import { CategoryIdDto } from "../dto/CategoryId.dto";
import { AdminAuthGuard } from "src/auth/adminAuth";
import { Roles } from "src/Roles/roles.decorator";
import { Role } from "src/Roles/role.enum";



@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }


    @UseGuards( AdminAuthGuard)
    @Roles(Role.Admin)
    @Post('addCategory')
    addCategory(@Body() body: CategoryDto){
        console.log(body)
        return this.categoryService.addCategory( body)
    }

    @Get()
    getall(){
        return this.categoryService.getAllCategory()
    }

    @Delete('delete/:categoryId')
    dletCategory(@Param() params: CategoryIdDto){
        return this.categoryService.deleteCategory(params.categoryId)
    }

    

}