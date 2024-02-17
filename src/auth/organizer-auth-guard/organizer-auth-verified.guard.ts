import { CanActivate, ExecutionContext, Injectable, NotAcceptableException } from '@nestjs/common';
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';

@Injectable()
export class OrganizerAuthVerifiedGuard implements CanActivate {
  constructor(private organizersRepository: OrganizersRepository) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest<{ auth: AccessAuth}>();
    if (!request.auth || request.auth.publicIdType !== 'organizer') {
      throw new NotAcceptableException();
    }

    const organizer = await this.organizersRepository.findOne(request.auth.publicId);
    if (!organizer || !organizer.otpVerified) {
      throw new NotAcceptableException();
    }

    return true;
  }
}