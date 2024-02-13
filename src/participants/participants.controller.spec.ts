import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsController } from '@/src/participants/participants.controller';
import { ParticipantsService } from '@/src/participants/participants.service';

describe('ParticipantsController', () => {
  let controller: ParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantsController],
      providers: [ParticipantsService],
    }).compile();

    controller = module.get<ParticipantsController>(ParticipantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
