import { Test, TestingModule } from '@nestjs/testing';
import { AnonimChatsService } from '@/src/anonim-chats/anonim-chats.service';

describe('AnonimChatsService', () => {
  let service: AnonimChatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnonimChatsService],
    }).compile();

    service = module.get<AnonimChatsService>(AnonimChatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
