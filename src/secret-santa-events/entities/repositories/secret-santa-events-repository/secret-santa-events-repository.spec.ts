import { SecretSantaEventsRepository } from '@/src/secret-santa-events/entities/repositories/secret-santa-events-repository/secret-santa-events-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('SecretSantaEventsRepository', () => {
  it('should be defined', () => {
    const postgresqlPrismaService = new PostgresqlPrismaService();
    expect(
      new SecretSantaEventsRepository(postgresqlPrismaService),
    ).toBeDefined();
  });
});
