import { Test, TestingModule } from '@nestjs/testing';
import { GiftWishlistsService } from '@/src/gift-wishlists/gift-wishlists.service';

describe('GiftWishlistsService', () => {
  let service: GiftWishlistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiftWishlistsService],
    }).compile();

    service = module.get<GiftWishlistsService>(GiftWishlistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
