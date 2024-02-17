import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthController } from '@/src/auth/auth.controller';
import { AuthService } from '@/src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreatorsService } from '@/src/creators/creators.service';
import { ParticipantsService } from '@/src/participants/participants.service';
import { CreatorsRepository } from '@/src/creators/entities/repositories/creators-repository/creators-repository';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService = { createJwtByCreatorPublicId: jest.fn(() => 'accessToken' ) };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService, 
        ConfigService, 
        JwtService, 
        CreatorsService, 
        ParticipantsService, 
        CreatorsRepository, 
        ParticipantsRepository, 
        PostgresqlPrismaService
      ]
    })
    .overrideProvider(AuthService)
    .useValue(authService)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/creator-auth (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/creator-auth')
      .send({ publicId: '52807360-991e-4945-85f8-910a6b6d2328' })
      .expect(201)
      .expect('accessToken');
  });
});
