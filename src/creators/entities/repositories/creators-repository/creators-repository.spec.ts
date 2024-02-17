import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsRepository } from '@/src/creators/entities/repositories/creators-repository/creators-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('CreatorsRepository', () => {
  let repository: CreatorsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatorsRepository, PostgresqlPrismaService],
    }).compile();

    repository = module.get<CreatorsRepository>(CreatorsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});