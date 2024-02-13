import { Module } from '@nestjs/common';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';
import { SecretSantaEventsController } from '@/src/secret-santa-events/secret-santa-events.controller';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';

@Module({
  imports: [PostgresqlPrismaModule],
  controllers: [SecretSantaEventsController],
  providers: [SecretSantaEventsService],
})
export class SecretSantaEventsModule {}
