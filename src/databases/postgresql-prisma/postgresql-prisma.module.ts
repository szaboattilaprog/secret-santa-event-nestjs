import { Module } from '@nestjs/common';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

@Module({
  providers: [PostgresqlPrismaService],
  exports: [PostgresqlPrismaService],
})
export class PostgresqlPrismaModule {}