import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
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

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService = { createJwtByOrganizerPublicId: jest.fn(() => 'accessToken' ) };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        ConfigService, 
        JwtService, 
        MailerService,
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
      ]
    })
    .overrideProvider(AuthService)
    .useValue(authService)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/organizer-auth (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/organizer-auth')
      .send({ publicId: '52807360-991e-4945-85f8-910a6b6d2328' })
      .expect(201)
      .expect('accessToken');
  });
});