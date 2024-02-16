import { Module } from '@nestjs/common';
import { ParticipantsService } from '@/src/participants/participants.service';
import { ParticipantsController } from '@/src/participants/participants.controller';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';
import { MakeGiftPairsListener } from '@/src/participants/make-gift-pairs-listener/make-gift-pairs-listener';
import { SecretSantaEventsModule } from '@/src/secret-santa-events/secret-santa-events.module';

@Module({
  imports: [PostgresqlPrismaModule, SecretSantaEventsModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ParticipantsRepository, MakeGiftPairsListener],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}