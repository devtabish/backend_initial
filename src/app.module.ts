import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/modules/user.module';
import {ConfigModule} from '@nestjs/config';
import { UserMiddleware } from './user/middleware/user.middleware';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './category/subcategory.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/authGuard';



@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,}),
    MongooseModule.forRoot(process.env.MONGO_URI as string), UserModule,AdminModule,CategoryModule, SubCategoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
],
  controllers: [AppController],
  providers: [AppService,
     {
        provide: APP_GUARD,
        useClass: AuthGuard,
      },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*')
  }
}
