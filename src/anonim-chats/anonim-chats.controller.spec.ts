import { Test, TestingModule } from '@nestjs/testing';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { AnonimChatsService } from '@/src/anonim-chats/anonim-chats.service';
import { AnonimChatsController } from '@/src/anonim-chats/anonim-chats.controller';
import { AnonimChatsRepository } from '@/src/anonim-chats/entities/repositories/anonim-chats-repository/anonim-chats-repository';

describe('AnonimChatsController', () => {
  let controller: AnonimChatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnonimChatsController],
      providers: [PostgresqlPrismaService, AnonimChatsService, AnonimChatsRepository],
    }).compile();

    controller = module.get<AnonimChatsController>(AnonimChatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});