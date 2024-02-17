import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGiftWishlistDto } from '@/src/gift-wishlists/dto/create-gift-wishlist.dto';
import { UpdateGiftWishlistDto } from '@/src/gift-wishlists/dto/update-gift-wishlist.dto';
import { GiftWishlistsRepository } from '@/src/gift-wishlists/entities/repositories/gift-wishlists-repository/gift-wishlists-repository';
import { GiftWishlist } from '@/src/gift-wishlists/entities/gift-wishlist.entity';

@Injectable()
export class GiftWishlistsService {
  constructor(
    private giftWishlistsRepository: GiftWishlistsRepository,
  ) {
  }

  async create(createGiftWishlistDto: CreateGiftWishlistDto): Promise<GiftWishlist> {
    const giftWishlist = await this.giftWishlistsRepository.create(createGiftWishlistDto);

    if (!giftWishlist) {
      throw new NotFoundException('GiftWishlist not created');
    }

    delete giftWishlist.id;

    return giftWishlist;
  }

  async findAll(participantPublicId: string): Promise<GiftWishlist[]> {
    const giftWishlists = await this.giftWishlistsRepository.findAll(participantPublicId);

    return giftWishlists.map(giftWishlist => {
      delete giftWishlist.id;
      return giftWishlist;
    });
  }

  async findOne(publicId: string): Promise<GiftWishlist> {
    const giftWishlist = await this.giftWishlistsRepository.findOne(publicId);

    if (!giftWishlist) {
      throw new NotFoundException('GiftWishlist not found');
    }

    delete giftWishlist.id;

    return giftWishlist;
  }

  async update(participantPublicId: string, publicId: string, updateGiftWishlistDto: UpdateGiftWishlistDto): Promise<GiftWishlist> {
    const giftWishlist = await this.giftWishlistsRepository.update(participantPublicId, publicId, updateGiftWishlistDto);

    if (!giftWishlist) {
      throw new NotFoundException('GiftWishlist not found');
    }

    delete giftWishlist.id;

    return giftWishlist;
  }

  async remove(participantPublicId: string, publicId: string) {
    return this.giftWishlistsRepository.remove(participantPublicId, publicId);
  }
}