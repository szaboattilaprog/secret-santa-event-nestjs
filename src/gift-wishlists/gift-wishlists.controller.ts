import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GiftWishlistsService } from '@/src/gift-wishlists/gift-wishlists.service';
import { CreateGiftWishlistDto } from '@/src/gift-wishlists/dto/create-gift-wishlist.dto';
import { UpdateGiftWishlistDto } from '@/src/gift-wishlists/dto/update-gift-wishlist.dto';

@Controller('gift-wishlists')
export class GiftWishlistsController {
  constructor(private readonly giftWishlistsService: GiftWishlistsService) {}

  @Post()
  create(@Body() createGiftWishlistDto: CreateGiftWishlistDto) {
    return this.giftWishlistsService.create(createGiftWishlistDto);
  }

  @Get()
  findAll() {
    return this.giftWishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftWishlistsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGiftWishlistDto: UpdateGiftWishlistDto,
  ) {
    return this.giftWishlistsService.update(+id, updateGiftWishlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftWishlistsService.remove(+id);
  }
}
