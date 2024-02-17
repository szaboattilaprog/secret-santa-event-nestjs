import { Test, TestingModule } from '@nestjs/testing';
import { AnonimChatsRepository } from '@/src/anonim-chats/entities/repositories/anonim-chats-repository/anonim-chats-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('AnonimChatsRepository', () => {
  let repository: AnonimChatsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnonimChatsRepository, PostgresqlPrismaService],
    }).compile();

    repository = module.get<AnonimChatsRepository>(AnonimChatsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});