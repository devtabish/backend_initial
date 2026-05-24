import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/customkey';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private reflector: Reflector){}
  async canActivate(
    context: ExecutionContext):  Promise<boolean> {
    console.log("auth guard is running")
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
     context.getClass(),
    ]);
    console.log({isPublic})
    if(isPublic){
        return true;
    }
    const request = context.switchToHttp().getRequest();
    const token =  this.extractTokenFromheader(request);
    if(!token){
        throw new UnauthorizedException("token is required");
    }
    try{
        const payload = await this.jwtService.verifyAsync(token)
        console.log("payload is running",{payload})
        request['user'] = payload
    }catch{
        throw new UnauthorizedException("token given")
    }
     return true;
  }

  private extractTokenFromheader(request: Request): string | undefined {
    const[type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token: undefined
  }
}



