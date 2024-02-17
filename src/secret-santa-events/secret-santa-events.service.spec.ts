import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';
import { SecretSantaEventsRepository } from '@/src/secret-santa-events/entities/repositories/secret-santa-events-repository/secret-santa-events-repository';

describe('SecretSantaEventsService', () => {
  let service: SecretSantaEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretSantaEventsService, EventEmitter2, PostgresqlPrismaService, SecretSantaEventsRepository],
    }).compile();

    service = module.get<SecretSantaEventsService>(SecretSantaEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});