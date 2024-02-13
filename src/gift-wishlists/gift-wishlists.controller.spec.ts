import { Test, TestingModule } from '@nestjs/testing';
import { GiftWishlistsController } from '@/src/gift-wishlists/gift-wishlists.controller';
import { GiftWishlistsService } from '@/src/gift-wishlists/gift-wishlists.service';

describe('GiftWishlistsController', () => {
  let controller: GiftWishlistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiftWishlistsController],
      providers: [GiftWishlistsService],
    }).compile();

    controller = module.get<GiftWishlistsController>(GiftWishlistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
