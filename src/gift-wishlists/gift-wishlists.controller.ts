import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotAcceptableException
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GiftWishlistsService } from '@/src/gift-wishlists/gift-wishlists.service';
import { CreateGiftWishlistDto } from '@/src/gift-wishlists/dto/create-gift-wishlist.dto';
import { UpdateGiftWishlistDto } from '@/src/gift-wishlists/dto/update-gift-wishlist.dto';
import { PartcipantAuthGuard } from '@/src/auth/partcipant-auth/partcipant-auth.guard';
import { Auth } from '@/src/auth/auth/auth.decorator'
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';
import { GiftWishlist } from '@/src/gift-wishlists/entities/gift-wishlist.entity';

@ApiTags('Gift Wishlists')
@ApiBearerAuth()
@UseGuards(PartcipantAuthGuard)
@Controller('gift-wishlists')
export class GiftWishlistsController {
  constructor(private readonly giftWishlistsService: GiftWishlistsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a giftWishlist' })
  @ApiResponse({ type: GiftWishlist, status: 201 })
  @ApiResponse({ status: 404, description: 'Gift Wishlist was not created, not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Gift Wishlist' })
  @ApiResponse({ status: 406, description: 'Has not access for Gift Wishlist' })
  create(
    @Body() createGiftWishlistDto: CreateGiftWishlistDto
  ): Promise<GiftWishlist> {
    return this.giftWishlistsService.create(createGiftWishlistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all giftWishlists for paricipant of Secret Sante event' })
  @ApiResponse({ type: [GiftWishlist], status: 200 })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Gift Wishlist' })
  @ApiResponse({ status: 406, description: 'Has not access for Gift Wishlist' })
  findAll(
    @Auth() auth: AccessAuth
  ): Promise<GiftWishlist[]> {
    return this.giftWishlistsService.findAll(auth.publicId);
  }

  @Get(':publicId')
  @ApiOperation({ summary: 'Get a giftWishlist for paricipant of Secret Sante event' })
  @ApiResponse({ type: GiftWishlist, status: 200 })
  @ApiResponse({ status: 404, description: 'Gift Wishlist not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Gift Wishlist' })
  @ApiResponse({ status: 406, description: 'Has not access for Gift Wishlist' })
  async findOne(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string
  ): Promise<GiftWishlist> {
    const giftWishlist = await this.giftWishlistsService.findOne(publicId);

    if (giftWishlist.participantPublicId !== auth.publicId) {
      throw new NotAcceptableException('Has not access for GiftWishlist');
    }

    return giftWishlist;
  }

  @Patch(':publicId')
  @ApiOperation({ summary: 'Update a giftWishlist for paricipant of Secret Sante event' })
  @ApiResponse({ type: GiftWishlist, status: 200 })
  @ApiResponse({ status: 404, description: 'Gift Wishlist not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Gift Wishlist' })
  @ApiResponse({ status: 406, description: 'Has not access for Gift Wishlist' })
  update(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string,
    @Body() updateGiftWishlistDto: UpdateGiftWishlistDto,
  ): Promise<GiftWishlist> {
    return this.giftWishlistsService.update(auth.publicId, publicId, updateGiftWishlistDto);
  }

  @Delete(':publicId')
  @ApiOperation({ summary: 'Remove a giftWishlist for paricipant of Secret Sante event' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Gift Wishlist not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Gift Wishlist' })
  @ApiResponse({ status: 406, description: 'Has not access for Gift Wishlist' })
  remove(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string
  ) {
    return this.giftWishlistsService.remove(auth.publicId, publicId);
  }
}