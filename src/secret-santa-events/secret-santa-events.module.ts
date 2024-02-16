import { Module } from '@nestjs/common';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';
import { SecretSantaEventsController } from '@/src/secret-santa-events/secret-santa-events.controller';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';
import { SecretSantaEventsRepository } from '@/src/secret-santa-events/entities/repositories/secret-santa-events-repository/secret-santa-events-repository';

@Module({
  imports: [PostgresqlPrismaModule],
  controllers: [SecretSantaEventsController],
  providers: [SecretSantaEventsService, SecretSantaEventsRepository],
  exports: [SecretSantaEventsRepository],
})
export class SecretSantaEventsModule {}