/*
  Warnings:

  - You are about to drop the column `gitfUrl` on the `GiftWishlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event"."GiftWishlist" DROP COLUMN "gitfUrl",
ADD COLUMN     "giftUrl" TEXT;
