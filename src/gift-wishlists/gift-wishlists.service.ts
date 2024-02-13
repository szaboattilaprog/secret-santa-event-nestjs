import { Injectable } from '@nestjs/common';
import { CreateGiftWishlistDto } from '@/src/gift-wishlists/dto/create-gift-wishlist.dto';
import { UpdateGiftWishlistDto } from '@/src/gift-wishlists/dto/update-gift-wishlist.dto';

@Injectable()
export class GiftWishlistsService {
  create(createGiftWishlistDto: CreateGiftWishlistDto) {
    return 'This action adds a new giftWishlist';
  }

  findAll() {
    return `This action returns all giftWishlists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} giftWishlist`;
  }

  update(id: number, updateGiftWishlistDto: UpdateGiftWishlistDto) {
    return `This action updates a #${id} giftWishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} giftWishlist`;
  }
}
