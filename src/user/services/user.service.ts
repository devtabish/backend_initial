import { Body, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserRepository } from 'src/user/schemas/userRepo';
import { UserDto } from '../dto/user.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UpdatePasswordDto } from '../dto/updatePasswordDto';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository, private jwtService: JwtService )
    { }



    async getAllUsers(): Promise<UserDocument[]> {
        const user = await this.userRepo.findAllUsers()
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        return user;

    }

    async signupUser(email: string, password: string) {

        // let data = {...data, userinfo}
        try {
            const userExist = await this.userRepo.findByEmail(email);
            if (userExist) {
                throw new ConflictException("User already exists, go to login")
            }
            const hash = await bcrypt.hash(password, 10)
            const userinfo = await this.userRepo.create({ email, password: hash })
            const message = "user created"
            
            return { userinfo, message }

        } catch (error) {
            if (error instanceof ConflictException) {
                throw error
            }
            // return {userinfo, message}

        }
    }


    async loginUser(data: UserDto): Promise<{access_token: string, user: UserDocument}> {
        try {
            console.log(data)

            const userExists = await this.userRepo.findByEmail(data.email);
            // console.log({ userExists })
            if (!userExists) {
                throw new NotFoundException("user not found, register first")
            }
            // console.log("check this line")
            if (userExists.password !== data.password) {
                throw new NotFoundException("wrong password")

            }
            // const user = await this.userRepo.findById(data._id)
            const payload = { sub: userExists._id};
            console.log("service payload",{payload})
            return {
                access_token: await this.jwtService.signAsync(payload),
                user: userExists,
            };
        }
        catch (error) {
            console.log({ error })

            throw error

        }

    }

    async getProfile(id: string) {
  const user = await this.userRepo.findById(id);
  if (!user) {
    throw new NotFoundException('User not found');
  }
  const newUser = user.toObject();
  delete newUser.password;
  return newUser;
}

    async updatePassword( _id: string, body: UpdatePasswordDto   ){
        try{
        const user = await this.userRepo.findByIdAndUpdate(_id)
        console.log("service me user kia haii?:", user);
        const message = "password updated successfully"
        if(!user){
            throw new NotFoundException('User not found')
            }
            
        if(user.password !== body.currentpassword){
            throw new UnauthorizedException('Current password is incorrect')
        }
        user.password = body.newpassword
        await user.save()
            
            return { message}

        }catch (error){
    throw error}
    }
}



    // return {userExist,checkPassword }












// async createStudent( email:string, password:string){
//         if(!email.includes('@')){
//             throw new Error('Invalid Email')
//         }
//         return this.userRepo.create( {email, password})
//     }






//  private students = [
//         {id: 1,
//         name: "tabish"},
//         {id: 2, name:'amin'}
//     ]
//      async getAllstudents(){
//         return this.students;
//     }

//     async createStudent(@Body() body: {name: string, age: number, data:any}) {
//         const newStudent = {
//             id: this.students.length + 1,
//             name: body.name,
//             age: body.age,
//             ...body.data,
//         };
//         this.students.push(newStudent);
//         return {
//             message: 'Student Added Successfully',
//             data: newStudent,
//         };
//     };