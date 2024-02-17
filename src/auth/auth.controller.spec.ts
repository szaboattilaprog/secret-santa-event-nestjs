import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MAILER_OPTIONS } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { AppMailerService } from '@/src/app-mailer/app-mailer.service';
import { OtpService } from '@/src/common/otp/otp.service';
import { AuthService } from '@/src/auth/auth.service';
import { OrganizersService } from '@/src/organizers/organizers.service';
import { ParticipantsService } from '@/src/participants/participants.service';
import { AuthController } from '@/src/auth/auth.controller';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        MailerService,
        ConfigService, 
        JwtService, 
        PostgresqlPrismaService,
        AppMailerService,
        OtpService,
        AuthService, 
        OrganizersService, 
        ParticipantsService, 
        OrganizersRepository, 
        ParticipantsRepository, 
        {
          provide: MAILER_OPTIONS,
          useValue: {
            transport: {
              host: 'smtp.example.com',
              port: 587,
              secure: false,
            }
          }
        },
        {
          provide: CACHE_MANAGER,
          useValue: Cache,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});