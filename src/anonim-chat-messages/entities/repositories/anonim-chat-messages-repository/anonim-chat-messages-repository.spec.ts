import { Test, TestingModule } from '@nestjs/testing';
import { AnonimChatMessagesRepository } from '@/src/anonim-chat-messages/entities/repositories/anonim-chat-messages-repository/anonim-chat-messages-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('AnonimChatMessagesRepository', () => {
  let repository: AnonimChatMessagesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnonimChatMessagesRepository, PostgresqlPrismaService],
    }).compile();

    repository = module.get<AnonimChatMessagesRepository>(AnonimChatMessagesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
