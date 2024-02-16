/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Creator` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "event"."SecretSantaEvent" ALTER COLUMN "settedAllParticipants" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Creator_email_key" ON "account"."Creator"("email");
