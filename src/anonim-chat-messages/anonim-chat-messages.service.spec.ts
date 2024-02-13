import { Test, TestingModule } from '@nestjs/testing';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';

describe('AnonimChatMessagesService', () => {
  let service: AnonimChatMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnonimChatMessagesService],
    }).compile();

    service = module.get<AnonimChatMessagesService>(AnonimChatMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
