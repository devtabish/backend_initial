
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/auth/authGuard";
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { MYJWT_SECRET } from "src/constants";
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
            secret: MYJWT_SECRET.secret
        
    }), forwardRef(()=> CategoryModule)
],
    
    providers: [SubCategoryService, SubCategoryRepository,

  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
],
exports: [SubCategoryRepository],
    controllers: [SubCategoryController]
})

export class SubCategoryModule {}