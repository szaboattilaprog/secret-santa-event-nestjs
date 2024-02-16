import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AnonimChatsService } from '@/src/anonim-chats/anonim-chats.service';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

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
