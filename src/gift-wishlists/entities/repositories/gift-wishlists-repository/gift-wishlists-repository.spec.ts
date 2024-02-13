import { GiftWishlistsRepository } from '@/src/gift-wishlists/entities/repositories/gift-wishlists-repository/gift-wishlists-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

describe('GiftWishlistsRepository', () => {
  it('should be defined', () => {
    const postgresqlPrismaService = new PostgresqlPrismaService();
    expect(new GiftWishlistsRepository(postgresqlPrismaService)).toBeDefined();
  });
});
