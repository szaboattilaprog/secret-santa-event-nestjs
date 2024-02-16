import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('ParticipantsRepository', () => {
  let repository: ParticipantsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantsRepository, PostgresqlPrismaService],
    }).compile();

    repository = module.get<ParticipantsRepository>(ParticipantsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
