import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AnonimChatsController } from '@/src/anonim-chats/anonim-chats.controller';
import { AnonimChatsService } from '@/src/anonim-chats/anonim-chats.service';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('AnonimChatsController', () => {
  let controller: AnonimChatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnonimChatsController],
      providers: [AnonimChatsService],
    }).compile();

    controller = module.get<AnonimChatsController>(AnonimChatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
