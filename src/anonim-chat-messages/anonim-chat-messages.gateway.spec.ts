import { Test, TestingModule } from '@nestjs/testing';
import { AnonimChatMessagesGateway } from '@/src/anonim-chat-messages/anonim-chat-messages.gateway';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';

describe('AnonimChatMessagesGateway', () => {
  let gateway: AnonimChatMessagesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnonimChatMessagesGateway, AnonimChatMessagesService],
    }).compile();

    gateway = module.get<AnonimChatMessagesGateway>(AnonimChatMessagesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
