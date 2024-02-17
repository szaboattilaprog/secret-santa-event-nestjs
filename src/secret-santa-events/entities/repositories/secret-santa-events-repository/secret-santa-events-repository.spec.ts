import { Test, TestingModule } from '@nestjs/testing';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { SecretSantaEventsRepository } from '@/src/secret-santa-events/entities/repositories/secret-santa-events-repository/secret-santa-events-repository';

describe('SecretSantaEventsRepository', () => {
  let repository: SecretSantaEventsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretSantaEventsRepository, PostgresqlPrismaService],
    }).compile();

    repository = module.get<SecretSantaEventsRepository>(SecretSantaEventsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});