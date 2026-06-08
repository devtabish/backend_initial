import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "src/customkey";



@Injectable()
export class AdminAuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService, private reflector: Reflector){}

    async canActivate(
        context: ExecutionContext):  Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if(isPublic){
            return true
        }
        const request = context.switchToHttp().getRequest();
        return this.jwtService.verify(request.headers.authorization?.split(' ')[1])?.role === 'admin'
    }
}