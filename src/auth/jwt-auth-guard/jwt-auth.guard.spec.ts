import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { MailerService } from '@nestjs-modules/mailer';
import { MAILER_OPTIONS } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { AppMailerService } from '@/src/app-mailer/app-mailer.service';
import { OtpService } from '@/src/common/otp/otp.service';
import { AuthService } from '@/src/auth/auth.service';
import { OrganizersService } from '@/src/organizers/organizers.service';
import { ParticipantsService } from '@/src/participants/participants.service';
import { JwtAuthGuard } from '@/src/auth/jwt-auth-guard/jwt-auth.guard';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        Reflector,
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

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});