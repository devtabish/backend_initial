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
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
     context.getClass(),
    ]);
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
        if(payload.role === 'user'){
          request['user'] = {id: payload.sub || payload.id}
        }else{
          request['user'] = payload
        }
        
    }catch{
        throw new UnauthorizedException()
    }
     return true;
  }

  private extractTokenFromheader(request: Request): string | undefined {
    const[type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token: undefined
  }
}



