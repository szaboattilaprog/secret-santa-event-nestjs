import { Test, TestingModule } from '@nestjs/testing';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { GiftWishlistsService } from '@/src/gift-wishlists/gift-wishlists.service';
import { GiftWishlistsController } from '@/src/gift-wishlists/gift-wishlists.controller';
import { GiftWishlistsRepository } from '@/src/gift-wishlists/entities/repositories/gift-wishlists-repository/gift-wishlists-repository';

describe('GiftWishlistsController', () => {
  let controller: GiftWishlistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiftWishlistsController],
      providers: [PostgresqlPrismaService, GiftWishlistsService, GiftWishlistsRepository],
    }).compile();

    controller = module.get<GiftWishlistsController>(GiftWishlistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});