import { Injectable, NotFoundException, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreatorsService } from '@/src/creators/creators.service';
import { ParticipantsService } from '@/src/participants/participants.service';
import { AccessToken } from '@/src/auth/entities/access-token.entity';
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private creatorsService: CreatorsService,
    private participantsService: ParticipantsService,
  ) {}

  async refreshCreatorToken(refreshToken: string): Promise<AccessToken> {
    const payload: AccessAuth = await this.decodeToken(refreshToken);
    if (payload.publicIdType !== 'creator') {
      throw new UnauthorizedException();
    }
    
    return this.createJwtByCreatorPublicId(payload.publicId);
  }

  async refreshPartcipantToken(refreshToken: string): Promise<AccessToken> {
    const payload: AccessAuth = await this.decodeToken(refreshToken);
    if (payload.publicIdType !== 'participant') {
      throw new UnauthorizedException();
    }

    return this.createJwtByPartcipantPublicId(payload.publicId);
  }


  async createJwtByCreatorPublicId(creatorPublicId: string): Promise<AccessToken> {
    const creator = await this.creatorsService.findOne(creatorPublicId);
    if (!creator) {
      throw new NotFoundException();
    }
    const payload = { publicId: creator.publicId, publicIdType: 'creator' };
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