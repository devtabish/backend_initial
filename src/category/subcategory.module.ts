
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/auth/authGuard";
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { SubCategorySchema } from "./subCategories/schema/subcategory.schema";
import { SubCategoryRepository } from "./subCategories/schema/subcategory.Repo";
import { SubCategoryController } from "./subCategories/controller/subcategory.controller";
import { SubCategoryService } from "./subCategories/service/subcategory.service";
import { CategoryModule } from "./category.module";
import { CategorySchema } from "./schema/category.schema";



@Module({
    imports:[MongooseModule.forFeature([{name:'SubCategory', schema: SubCategorySchema,},
      {name:'Category', schema: CategorySchema}
    ]),
    JwtModule.register({ 
            global : true,
            secret: process.env.MYJWT_SECRET as string
        
    }), forwardRef(()=> CategoryModule)
],
    
    providers: [SubCategoryService, SubCategoryRepository,
],
exports: [SubCategoryRepository],
    controllers: [SubCategoryController]
})

export class SubCategoryModule {}