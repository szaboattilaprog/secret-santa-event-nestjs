import { PartialType } from '@nestjs/swagger';
import { CreateGiftWishlistDto } from '@/src/gift-wishlists/dto/create-gift-wishlist.dto';

export class UpdateGiftWishlistDto extends PartialType(CreateGiftWishlistDto) {}
