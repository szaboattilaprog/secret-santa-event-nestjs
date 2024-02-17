import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';
import { SecretSantaEventsController } from '@/src/secret-santa-events/secret-santa-events.controller';
import { SecretSantaEventsRepository } from '@/src/secret-santa-events/entities/repositories/secret-santa-events-repository/secret-santa-events-repository';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';

describe('SecretSantaEventsController', () => {
  let controller: SecretSantaEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretSantaEventsController],
      providers: [EventEmitter2, PostgresqlPrismaService, SecretSantaEventsService, SecretSantaEventsRepository, OrganizersRepository],
    }).compile();

    controller = module.get<SecretSantaEventsController>(
      SecretSantaEventsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});