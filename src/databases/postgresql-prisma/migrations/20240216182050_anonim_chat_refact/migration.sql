/*
  Warnings:

  - You are about to drop the column `creatorPublicId` on the `AnonimChat` table. All the data in the column will be lost.
  - Added the required column `creatorParticipantPublicId` to the `AnonimChat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event"."AnonimChat" DROP CONSTRAINT "AnonimChat_creatorPublicId_fkey";

-- AlterTable
ALTER TABLE "event"."AnonimChat" DROP COLUMN "creatorPublicId",
ADD COLUMN     "creatorParticipantPublicId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "event"."AnonimChat" ADD CONSTRAINT "AnonimChat_creatorParticipantPublicId_fkey" FOREIGN KEY ("creatorParticipantPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;
