import { Module } from '@nestjs/common';
import { UserController } from 'src/user/controllers/user.controller';
import { UserService } from 'src/user/services/user.service';
import { UserRepository } from '../schemas/userRepo';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/auth/authGuard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports:[MongooseModule.forFeature([{name:'User', schema: UserSchema}]),
    JwtModule.register({ 
            global : true,
            secret: process.env.MYJWT_SECRET as string
        
    })
],
    
    providers: [UserService, UserRepository, 

  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
],
    controllers: [UserController]
})
export class UserModule {}
