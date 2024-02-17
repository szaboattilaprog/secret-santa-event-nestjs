import { Test, TestingModule } from '@nestjs/testing';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { GiftWishlistsService } from '@/src/gift-wishlists/gift-wishlists.service';
import { GiftWishlistsRepository } from '@/src/gift-wishlists/entities/repositories/gift-wishlists-repository/gift-wishlists-repository';

describe('GiftWishlistsService', () => {
  let service: GiftWishlistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiftWishlistsService, PostgresqlPrismaService, GiftWishlistsRepository],
    }).compile();

    service = module.get<GiftWishlistsService>(GiftWishlistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});