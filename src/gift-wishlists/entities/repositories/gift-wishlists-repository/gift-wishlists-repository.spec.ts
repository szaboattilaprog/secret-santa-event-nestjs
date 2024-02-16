import { Test, TestingModule } from '@nestjs/testing';
import { GiftWishlistsRepository } from '@/src/gift-wishlists/entities/repositories/gift-wishlists-repository/gift-wishlists-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('GiftWishlistsRepository', () => {
  let repository: GiftWishlistsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiftWishlistsRepository, PostgresqlPrismaService],
    }).compile();

    repository = module.get<GiftWishlistsRepository>(GiftWishlistsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
