import { CategoryController } from "./controller/category.controller";
import { CategoryRepository } from "./schema/category.repo";
import { CategorySchema } from "./schema/category.schema";
import { CategoryService } from "./service/category.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/auth/authGuard";
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { MYJWT_SECRET } from "src/constants";
import { SubCategorySchema } from "./subCategories/schema/subcategory.schema";
import { SubCategoryModule } from "./subcategory.module";



@Module({
    imports:[MongooseModule.forFeature([{name:'Category', schema: CategorySchema,},
      {name: 'SubCategory', schema: SubCategorySchema}
    ]),
    JwtModule.register({ 
            global : true,
            secret: MYJWT_SECRET.secret
        
    }), forwardRef(()=> SubCategoryModule)
],
    
    providers: [CategoryService, CategoryRepository, 

  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
],
exports: [CategoryRepository],
    controllers: [CategoryController]
})

export class CategoryModule {}