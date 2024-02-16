import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';

describe('SecretSantaEventsService', () => {
  let service: SecretSantaEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretSantaEventsService],
    }).compile();

    service = module.get<SecretSantaEventsService>(SecretSantaEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
