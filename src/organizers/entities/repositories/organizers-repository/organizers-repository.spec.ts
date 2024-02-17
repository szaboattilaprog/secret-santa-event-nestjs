import { Test, TestingModule } from '@nestjs/testing';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';

describe('OrganizersRepository', () => {
  let repository: OrganizersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizersRepository, PostgresqlPrismaService],
    }).compile();

    repository = module.get<OrganizersRepository>(OrganizersRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});