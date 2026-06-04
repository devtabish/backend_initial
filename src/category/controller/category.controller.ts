import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { Public } from "src/customkey";
import { CategoryDto } from "../dto/category.dto";
import { AuthGuard } from "src/auth/authGuard";



@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }


    @UseGuards(AuthGuard)
    @Post('addCategory')
    addCategory(@Body() body: CategoryDto){
        console.log(body)
        return this.categoryService.addCategory( body)
    }

    @Get()
    getall(){
        return this.categoryService.findall()
    }

    @Get(':id')
    findone(@Param('id') id: string){
        return this.categoryService.findone(id)
    }
    

}