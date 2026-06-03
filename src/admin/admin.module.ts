import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './service/admin.service';
import { AdminRepository } from './schema/admin.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './schema/admin.schema';
import { JwtModule } from '@nestjs/jwt';
import { MYJWT_SECRET } from 'src/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/authGuard';

@Module({
    imports:[MongooseModule.forFeature([{name:'Admin', schema: AdminSchema}]),
    JwtModule.register({ 
            global : true,
            secret: MYJWT_SECRET.secret
        
    })
],
    
    providers: [AdminService, AdminRepository, 

  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
],
    controllers: [AdminController]
})

export class AdminModule {}