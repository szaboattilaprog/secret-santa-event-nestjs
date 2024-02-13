import { CreatorsRepository } from '@/src/creators/entities/repositories/creators-repository/creators-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('CreatorsRepository', () => {
  it('should be defined', () => {
    const postgresqlPrismaService = new PostgresqlPrismaService();
    expect(new CreatorsRepository(postgresqlPrismaService)).toBeDefined();
  });
});
