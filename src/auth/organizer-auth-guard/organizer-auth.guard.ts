import { CanActivate, ExecutionContext, Injectable, NotAcceptableException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';

@Injectable()
export class OrganizerAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<{ auth: AccessAuth}>();
    if (!request.auth || request.auth.publicIdType !== 'organizer') {
      throw new NotAcceptableException();
    }

    return true;
  }
}