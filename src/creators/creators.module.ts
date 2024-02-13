import { Module } from '@nestjs/common';
import { CreatorsService } from '@/src/creators/creators.service';
import { CreatorsController } from '@/src/creators/creators.controller';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';

@Module({
  imports: [PostgresqlPrismaModule],
  controllers: [CreatorsController],
  providers: [CreatorsService],
})
export class CreatorsModule {}
