import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsController } from '@/src/creators/creators.controller';
import { CreatorsService } from '@/src/creators/creators.service';
import { CreatorsRepository } from '@/src/creators/entities/repositories/creators-repository/creators-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('CreatorsController', () => {
  let controller: CreatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatorsController],
      providers: [CreatorsService, CreatorsRepository, PostgresqlPrismaService],
    }).compile();

    controller = module.get<CreatorsController>(CreatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});