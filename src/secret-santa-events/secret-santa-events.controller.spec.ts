import { Test, TestingModule } from '@nestjs/testing';
import { SecretSantaEventsController } from '@/src/secret-santa-events/secret-santa-events.controller';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';

describe('SecretSantaEventsController', () => {
  let controller: SecretSantaEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretSantaEventsController],
      providers: [SecretSantaEventsService],
    }).compile();

    controller = module.get<SecretSantaEventsController>(
      SecretSantaEventsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
