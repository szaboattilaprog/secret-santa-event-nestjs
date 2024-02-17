import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@/src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreatorsService } from '@/src/creators/creators.service';
import { ParticipantsService } from '@/src/participants/participants.service';
import { CreatorsRepository } from '@/src/creators/entities/repositories/creators-repository/creators-repository';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, 
        ConfigService, 
        JwtService, 
        CreatorsService, 
        ParticipantsService, 
        CreatorsRepository, 
        ParticipantsRepository, 
        PostgresqlPrismaService
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
