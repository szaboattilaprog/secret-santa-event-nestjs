import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AnonimChatMessagesController } from '@/src/anonim-chat-messages/anonim-chat-messages.controller';
import { AnonimChatsService } from '@/src/anonim-chats/anonim-chats.service';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('AnonimChatMessagesController', () => {
  let controller: AnonimChatMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnonimChatMessagesController],
      providers: [AnonimChatMessagesController],
    }).compile();

    controller = module.get<AnonimChatMessagesController>(AnonimChatMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
