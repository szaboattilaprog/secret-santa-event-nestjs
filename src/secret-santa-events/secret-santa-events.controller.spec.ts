import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SecretSantaEventsController } from '@/src/secret-santa-events/secret-santa-events.controller';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';
import { SecretSantaEventsRepository } from '@/src/secret-santa-events/entities/repositories/secret-santa-events-repository/secret-santa-events-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('SecretSantaEventsController', () => {
  let controller: SecretSantaEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretSantaEventsController],
      providers: [SecretSantaEventsService, SecretSantaEventsRepository, PostgresqlPrismaService, EventEmitter2],
    }).compile();

    controller = module.get<SecretSantaEventsController>(
      SecretSantaEventsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});