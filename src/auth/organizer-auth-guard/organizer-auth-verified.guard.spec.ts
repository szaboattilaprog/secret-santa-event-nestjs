import { Test, TestingModule } from '@nestjs/testing';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { OrganizerAuthVerifiedGuard } from '@/src/auth/organizer-auth-guard/organizer-auth-verified.guard';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';

describe('OrganizerAuthVerifiedGuard', () => {
  let guard: OrganizerAuthVerifiedGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizerAuthVerifiedGuard,
        PostgresqlPrismaService,
        OrganizersRepository
      ],
    }).compile();

    guard = module.get<OrganizerAuthVerifiedGuard>(OrganizerAuthVerifiedGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});