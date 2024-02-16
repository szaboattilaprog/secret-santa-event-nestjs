import { CanActivate, ExecutionContext, Injectable, NotAcceptableException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';

@Injectable()
export class CreatorAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<{ auth: AccessAuth}>();
    if (!request.auth || request.auth.publicIdType !== 'creator') {
      throw new NotAcceptableException();
    }

    return true;
  }
}
