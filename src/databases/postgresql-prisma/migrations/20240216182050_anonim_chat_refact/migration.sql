/*
  Warnings:

  - You are about to drop the column `organizerPublicId` on the `AnonimChat` table. All the data in the column will be lost.
  - Added the required column `organizerParticipantPublicId` to the `AnonimChat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event"."AnonimChat" DROP CONSTRAINT "AnonimChat_organizerPublicId_fkey";

-- AlterTable
ALTER TABLE "event"."AnonimChat" DROP COLUMN "organizerPublicId",
ADD COLUMN     "organizerParticipantPublicId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "event"."AnonimChat" ADD CONSTRAINT "AnonimChat_organizerParticipantPublicId_fkey" FOREIGN KEY ("organizerParticipantPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;
