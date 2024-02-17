import { Test, TestingModule } from '@nestjs/testing';
import { GiftWishlistsController } from '@/src/gift-wishlists/gift-wishlists.controller';
import { GiftWishlistsService } from '@/src/gift-wishlists/gift-wishlists.service';
import { GiftWishlistsRepository } from '@/src/gift-wishlists/entities/repositories/gift-wishlists-repository/gift-wishlists-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('GiftWishlistsController', () => {
  let controller: GiftWishlistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiftWishlistsController],
      providers: [GiftWishlistsService, GiftWishlistsRepository, PostgresqlPrismaService],
    }).compile();

    controller = module.get<GiftWishlistsController>(GiftWishlistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});