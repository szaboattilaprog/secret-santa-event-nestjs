import { Test, TestingModule } from '@nestjs/testing';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { ParticipantsService } from '@/src/participants/participants.service';
import { ParticipantsController } from '@/src/participants/participants.controller';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';

describe('ParticipantsController', () => {
  let controller: ParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantsController],
      providers: [PostgresqlPrismaService, ParticipantsService, ParticipantsRepository, OrganizersRepository],
    }).compile();

    controller = module.get<ParticipantsController>(ParticipantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});