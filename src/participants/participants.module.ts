import { Module } from '@nestjs/common';
import { ParticipantsService } from '@/src/participants/participants.service';
import { ParticipantsController } from '@/src/participants/participants.controller';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';

@Module({
  imports: [PostgresqlPrismaModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
})
export class ParticipantsModule {}
