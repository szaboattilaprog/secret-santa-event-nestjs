import { AnonimChatsRepository } from '@/src/anonim-chats/entities/repositories/anonim-chats-repository/anonim-chats-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('AnonimChatsRepository', () => {
  it('should be defined', () => {
    const postgresqlPrismaService = new PostgresqlPrismaService();
    expect(new AnonimChatsRepository(postgresqlPrismaService)).toBeDefined();
  });
});
