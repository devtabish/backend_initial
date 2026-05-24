import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import {ConfigModule} from '@nestjs/config';
import { UserMiddleware } from './user/middleware/user.middleware';



@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,}),
    MongooseModule.forRoot(process.env.MONGO_URI as string), UserModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*')
  }
}
