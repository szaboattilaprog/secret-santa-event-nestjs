import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AnonimChatMessagesGateway } from '@/src/anonim-chat-messages/anonim-chat-messages.gateway';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';
import { AnonimChatMessagesRepository } from '@/src/anonim-chat-messages/entities/repositories/anonim-chat-messages-repository/anonim-chat-messages-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('AnonimChatMessagesGateway', () => {
  let gateway: AnonimChatMessagesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnonimChatMessagesGateway, AnonimChatMessagesService, EventEmitter2, AnonimChatMessagesRepository, PostgresqlPrismaService],
    }).compile();

    gateway = module.get<AnonimChatMessagesGateway>(AnonimChatMessagesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
