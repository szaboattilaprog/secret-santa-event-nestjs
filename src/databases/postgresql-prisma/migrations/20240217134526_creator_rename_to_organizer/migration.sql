/*
  Warnings:

  - You are about to drop the column `organizerParticipantPublicId` on the `AnonimChat` table. All the data in the column will be lost.
  - Added the required column `participantPublicId` to the `AnonimChat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event"."AnonimChat" DROP CONSTRAINT "AnonimChat_organizerParticipantPublicId_fkey";

-- AlterTable
ALTER TABLE "event"."AnonimChat" DROP COLUMN "organizerParticipantPublicId",
ADD COLUMN     "participantPublicId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "event"."AnonimChat" ADD CONSTRAINT "AnonimChat_participantPublicId_fkey" FOREIGN KEY ("participantPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;
