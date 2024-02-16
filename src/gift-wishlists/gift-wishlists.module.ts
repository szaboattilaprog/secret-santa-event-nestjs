import { Module } from '@nestjs/common';
import { GiftWishlistsService } from '@/src/gift-wishlists/gift-wishlists.service';
import { GiftWishlistsController } from '@/src/gift-wishlists/gift-wishlists.controller';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';
import { GiftWishlistsRepository } from '@/src/gift-wishlists/entities/repositories/gift-wishlists-repository/gift-wishlists-repository';

@Module({
  imports: [PostgresqlPrismaModule],
  controllers: [GiftWishlistsController],
  providers: [GiftWishlistsService, GiftWishlistsRepository],
})
export class GiftWishlistsModule {}