import { Test, TestingModule } from '@nestjs/testing';
import { AnonimChatMessagesController } from '@/src/anonim-chat-messages/anonim-chat-messages.controller';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';
import { AnonimChatMessagesRepository } from '@/src/anonim-chat-messages/entities/repositories/anonim-chat-messages-repository/anonim-chat-messages-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('AnonimChatMessagesController', () => {
  let controller: AnonimChatMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnonimChatMessagesController],
      providers: [AnonimChatMessagesController, AnonimChatMessagesService, AnonimChatMessagesRepository, PostgresqlPrismaService],
    }).compile();

    controller = module.get<AnonimChatMessagesController>(AnonimChatMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});