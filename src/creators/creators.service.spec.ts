import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsService } from '@/src/creators/creators.service';
import { CreatorsRepository } from '@/src/creators/entities/repositories/creators-repository/creators-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('CreatorsService', () => {
  let service: CreatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatorsService, CreatorsRepository, PostgresqlPrismaService],
    }).compile();

    service = module.get<CreatorsService>(CreatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});