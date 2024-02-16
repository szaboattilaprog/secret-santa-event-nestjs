import { Injectable, Logger } from '@nestjs/common';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { CreateGiftWishlistDto } from '@/src/gift-wishlists/dto/create-gift-wishlist.dto';
import { UpdateGiftWishlistDto } from '@/src/gift-wishlists/dto/update-gift-wishlist.dto';
import { GiftWishlist } from '@/src/gift-wishlists/entities/gift-wishlist.entity';

@Injectable()
export class GiftWishlistsRepository {
  private readonly logger = new Logger(GiftWishlistsRepository.name);

  constructor(
    private readonly postgresqlPrismaService: PostgresqlPrismaService,
  ) {}

  async create(createGiftWishlistDto: CreateGiftWishlistDto): Promise<GiftWishlist> {
    return this.postgresqlPrismaService.giftWishlist.create({ data: createGiftWishlistDto });
  }

  async findAll(participantPublicId: string): Promise<GiftWishlist[]> {
    return this.postgresqlPrismaService.giftWishlist.findMany({ where: { participantPublicId } });
  }

  async findOne(publicId: string): Promise<GiftWishlist> {
    return this.postgresqlPrismaService.giftWishlist.findUnique({ where: { publicId } });
  }

  async update(participantPublicId: string, publicId: string, updateGiftWishlistDto: UpdateGiftWishlistDto): Promise<GiftWishlist> {
    return this.postgresqlPrismaService.giftWishlist.update({ where: { publicId, participantPublicId }, data: updateGiftWishlistDto });
  }

  async remove(participantPublicId: string, publicId: string) {
    return this.postgresqlPrismaService.giftWishlist.delete({ where: { publicId, participantPublicId } });
  }
}