import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { UserDto } from '../dto/user.dto';
import { AuthGuard } from 'src/auth/authGuard';
import { Public } from 'src/customkey';
import { Request } from '@nestjs/common';
import { LoginDto } from '../dto/loginDto';
import { UpdateUserDto } from '../dto/updatedataDto';
import { NotFoundError } from 'rxjs';
import { UpdatePasswordDto } from '../dto/updatePasswordDto';
import { Roles } from 'src/Roles/roles.decorator';
import { RolesGuard } from 'src/Roles/roles.guard';
import { Role } from 'src/Roles/role.enum';

@Controller('user')
export class UserController {
    constructor(private readonly studentService: UserService) { }

    @Public()
    @Get('AllUsers')
    getAllUsers() {
        return this.studentService.getAllUsers()
    }

    @Public()
    @Post('signup')
    CreateUser(@Body() createuser: UserDto) {
        return this.studentService.signupUser(createuser);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    LoginUser(@Body() body: LoginDto) {
        return this.studentService.loginUser(body)
    }


    @UseGuards(RolesGuard)
    @Roles(Role.User)
    @Get('profile')
    getProfile(@Request() req) {
        console.log("request", req.user)
        console.log("Controller me req kya haii?:", req.user, "or id ye haii", req._id);
        return this.studentService.getProfile(req.user.sub)
    }

    @UseGuards(AuthGuard)
    @Put('update')
    async updateUser(@Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const updated = await this.studentService.updateUserData(id, updateUserDto);
        if (!updated) throw new NotFoundError('User not found');
        return updated;
    }

    @UseGuards(AuthGuard)
    @Patch('/')
    updatePass(
        @Body() body: UpdatePasswordDto, @Request() req) {
        return this.studentService.UpdatePassword(req.user.user._id, body)

    }
}   
