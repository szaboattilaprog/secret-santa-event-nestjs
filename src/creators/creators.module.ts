import { Module } from '@nestjs/common';
import { CreatorsService } from '@/src/creators/creators.service';
import { CreatorsController } from '@/src/creators/creators.controller';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';
import { CreatorsRepository } from '@/src/creators/entities/repositories/creators-repository/creators-repository';

@Module({
  imports: [PostgresqlPrismaModule],
  controllers: [CreatorsController],
  providers: [CreatorsService, CreatorsRepository],
  exports: [CreatorsService],
})
export class CreatorsModule {}