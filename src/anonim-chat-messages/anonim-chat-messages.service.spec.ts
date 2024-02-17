import { Test, TestingModule } from '@nestjs/testing';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';
import { AnonimChatMessagesRepository } from '@/src/anonim-chat-messages/entities/repositories/anonim-chat-messages-repository/anonim-chat-messages-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('AnonimChatMessagesService', () => {
  let service: AnonimChatMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnonimChatMessagesService, AnonimChatMessagesRepository, PostgresqlPrismaService],
    }).compile();

    service = module.get<AnonimChatMessagesService>(AnonimChatMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});