import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';

@Injectable()
export class ParticipantAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<{ auth: AccessAuth}>();
    if (!request.auth || request.auth.publicIdType !== 'participant') {
      throw new UnauthorizedException();
    }

    return true;
  }
}