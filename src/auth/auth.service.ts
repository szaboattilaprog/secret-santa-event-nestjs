import { Injectable, NotFoundException, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OrganizersService } from '@/src/organizers/organizers.service';
import { ParticipantsService } from '@/src/participants/participants.service';
import { AccessToken } from '@/src/auth/entities/access-token.entity';
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private organizersService: OrganizersService,
    private participantsService: ParticipantsService,
  ) {}

  async refreshOrganizerToken(refreshToken: string): Promise<AccessToken> {
    const payload: AccessAuth = await this.decodeToken(refreshToken);
    if (payload.publicIdType !== 'organizer') {
      throw new UnauthorizedException();
    }
    
    return this.createJwtByOrganizerPublicId(payload.publicId);
  }

  async refreshPartcipantToken(refreshToken: string): Promise<AccessToken> {
    const payload: AccessAuth = await this.decodeToken(refreshToken);
    if (payload.publicIdType !== 'participant') {
      throw new UnauthorizedException();
    }

    return this.createJwtByPartcipantPublicId(payload.publicId);
  }


  async createJwtByOrganizerPublicId(organizerPublicId: string): Promise<AccessToken> {
    const organizer = await this.organizersService.findOne(organizerPublicId);
    if (!organizer) {
      throw new NotFoundException();
    }
    const payload = { publicId: organizer.publicId, publicIdType: 'organizer' };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }

  async createJwtByPartcipantPublicId(parcipantPublicId: string): Promise<AccessToken> {
    const participant = await this.participantsService.findOne(parcipantPublicId);
    if (!participant) {
      throw new NotFoundException();
    }
    const payload = { publicId: participant.publicId, publicIdType: 'participant' };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }
  
  private async decodeToken(token: string): Promise<AccessAuth>{
    return this.jwtService.decode(token, {
      complete: false,
      json: true,
    });
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException();
    }
  }
}