import { Test, TestingModule } from '@nestjs/testing';
import { AnonimChatsService } from '@/src/anonim-chats/anonim-chats.service';
import { AnonimChatsRepository } from '@/src/anonim-chats/entities/repositories/anonim-chats-repository/anonim-chats-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('AnonimChatsService', () => {
  let service: AnonimChatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnonimChatsService, AnonimChatsRepository, PostgresqlPrismaService],
    }).compile();

    service = module.get<AnonimChatsService>(AnonimChatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});