import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { UserDto } from '../dto/user.dto';
import { AuthGuard } from 'src/auth/authGuard';
import { Public } from 'src/customkey';
import { Request } from '@nestjs/common';
import { UpdatePasswordDto } from '../dto/updatePasswordDto';

@Controller('user')
export class UserController {
        constructor(private readonly studentService: UserService){}

        @Public()
        @Get('AllUsers')
        getAllUsers(@Param('id') id: number){
            return this.studentService.getAllUsers()
        }

        @Public()
        @Post('signup')
        CreateUser(@Body() createuser: UserDto){
            return this.studentService.signupUser(createuser.email, createuser.password);
        }

        @Public()
        @HttpCode(HttpStatus.OK)
        @Post('login')
        LoginUser(@Body() body: UserDto){
            return this.studentService.loginUser( body)
        }


        @UseGuards(AuthGuard)
        @Get('profile')
        getProfile(@Request() req){
            console.log("Controller me req kya haii?:", req.user, req.id);
            return this.studentService.getProfile(req.user.sub)
        }

        @UseGuards(AuthGuard)
        @Post('update')
        updatePass(@Request() req, @Body() body: UpdatePasswordDto){
            console.log("controller me body kya kia haii?:", body);
            return this.studentService.updatePassword(req.user.sub, body)
        }
}   
