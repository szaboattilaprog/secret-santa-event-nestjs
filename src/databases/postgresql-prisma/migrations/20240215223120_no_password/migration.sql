/*
  Warnings:

  - You are about to drop the column `password` on the `Creator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "account"."Creator" DROP COLUMN "password";
