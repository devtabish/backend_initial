import { BadRequestException, Body, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserRepository } from '../schemas/userRepo';
import { UserDto } from '../dto/user.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UpdatePasswordDto } from '../dto/updatePasswordDto';
import { hash } from 'crypto';
import { LoginDto } from '../dto/loginDto';
import { UpdateUserDto } from '../dto/updatedataDto';
import { AdminDto } from '../../admin/dto/admindto';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository, private jwtService: JwtService)
    { }



    async getAllUsers(): Promise<UserDocument[]> {
        const user = await this.userRepo.findAllUsers()
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        return user;

    }


    async signupUser(body: UserDto) {

        // let data = {...data, userinfo}
        try {
            const userExist = await this.userRepo.findByEmail(body.email);
            console.log(userExist)
            if (userExist) {
                throw new ConflictException("User already exists, go to login")
            }
            const hash = await bcrypt.hash(body.password, 10)
            console.log("signup hashed", hash)
            const userinfo = await this.userRepo.create({ email: body.email, password: hash, phoneno: body.phoneNo, address: body.address, age: body.age, city: body.city })
            userinfo.save()
            const user = await userinfo.toObject()
            // console.log(user)
            // delete user.password && delete  user._id

            const message = "user created"
            
            return { userinfo, message }

        } catch (error) {
            if (error instanceof ConflictException) {
                throw error
            }
            // return {userinfo, message}

        }
    }

    async loginUser(data: LoginDto): Promise<{ access_token: string, user: UserDocument}> {
        try {
            const userExists = await this.userRepo.findByEmail(data.email);
            console.log("userExists", userExists)
            console.log("data", data)
            if (!userExists) {
                throw new NotFoundException("user not found, register first")
            }
        
            console.log("check this line")
            
            const isMatch = await bcrypt.compare(data.password, userExists.password)
            if (!isMatch) {
                throw new UnauthorizedException("wrong password")
            }
            // const hash = await bcrypt.hash(data.password, 10)
            // const userData = userExists.toObject()
            // delete userData.password && delete userData._id
            const payload = { id: userExists.id,
                email: userExists.email,
                role: userExists.role
            };
            const access_token = await this.jwtService.signAsync(payload)
            
            
            
            return {
                access_token,
                user: userExists,
            };
        }
        catch (error) {
            console.log({ error })

            throw error

        }

    }

    async getProfile(email: string) {
  const profile = await this.userRepo.findByEmail(email)
  console.log( profile)
  if (!profile) {
    throw new NotFoundException('User not found');
  }
//   const userProfile = profile.toObject()
//   delete userProfile.password && userProfile._id
//   return userProfile
}

    async updateUserData( _id: string,  body: UpdateUserDto) {
        try{
            const { email, phoneNo, address, age, city } = body
        const userdata = {}
        
        if(email){
           userdata['email'] =  body.email 
        }
        if(phoneNo){
           userdata['phoneNo'] =  body.phoneNo 
        }
        if(address){
            userdata['address'] = body.address
        }
        if(age){
            userdata['age'] = body.age
        }
        if(city){
            userdata['city']= body.city
        }

//   const plainUpdate = { ...body };
  console.log("bodyData", body)
  const updatedUser = await this.userRepo.findByIdAndUpdate(_id, userdata)
  

  if (!updatedUser) {
    throw new NotFoundException('User not found');
  }
        
    return updatedUser
        }catch (error){
    throw error}
    }

    
    async UpdatePassword(id: string, body: UpdatePasswordDto){

        try{
        const user = await this.userRepo.findByIID(id)
        console.log("user", user)
        const message = "password updated successfully"
        let hash = await bcrypt.hash(user.password, 10)
        console.log("hshd pass", hash)
        console.log("body pass", body.currentpassword)
        const isMatch = await bcrypt.compare(hash, body.currentpassword)
        if(!isMatch){
            throw new UnauthorizedException('Current password is incorrect')
        }
         hash = body.newpassword 
         
        await user.save()
        // const userData = user.toObject()
        // delete userData.password
        return {user, message}
        }catch(error){
            throw error
        }
        



}
}




//user.password = body.password


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