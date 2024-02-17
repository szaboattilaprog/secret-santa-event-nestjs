import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/src/auth/auth.service';
import { IS_PUBLIC_KEY } from '@/src/auth/is-public-decorator/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  //private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(private reflector: Reflector, private authService: AuthService) {
    super()
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException()
    }

    request.auth = await this.authService.verifyToken(token);
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    //this.logger.log('Extracting token from header', request.headers);
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}