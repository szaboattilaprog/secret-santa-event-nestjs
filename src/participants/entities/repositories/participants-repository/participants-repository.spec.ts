import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('ParticipantsRepository', () => {
  it('should be defined', () => {
    const postgresqlPrismaService = new PostgresqlPrismaService();
    expect(new ParticipantsRepository(postgresqlPrismaService)).toBeDefined();
  });
});
