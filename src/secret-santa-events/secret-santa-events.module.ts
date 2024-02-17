import { Module } from '@nestjs/common';
import { OrganizersModule } from '@/src/organizers/organizers.module';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';
import { SecretSantaEventsController } from '@/src/secret-santa-events/secret-santa-events.controller';
import { SecretSantaEventCountDownTimerGateway } from '@/src/secret-santa-events/secret-santa-event-cont-down-timer.gateway';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';
import { SecretSantaEventsRepository } from '@/src/secret-santa-events/entities/repositories/secret-santa-events-repository/secret-santa-events-repository';

@Module({
  imports: [PostgresqlPrismaModule, OrganizersModule],
  controllers: [SecretSantaEventsController],
  providers: [SecretSantaEventsService, SecretSantaEventCountDownTimerGateway, SecretSantaEventsRepository],
  exports: [SecretSantaEventsRepository],
})
export class SecretSantaEventsModule {}