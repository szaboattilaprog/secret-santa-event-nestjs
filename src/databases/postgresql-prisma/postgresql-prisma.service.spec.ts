import { Test, TestingModule } from '@nestjs/testing';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('PostgresqlService', () => {
  let service: PostgresqlPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresqlPrismaService],
    }).compile();

    service = module.get<PostgresqlPrismaService>(PostgresqlPrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});