/*
  Warnings:

  - You are about to drop the column `giverPairParticipantPublicId` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `receiverePairParticipantPublicId` on the `Participant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "event"."Participant" DROP CONSTRAINT "Participant_giverPairParticipantPublicId_fkey";

-- DropForeignKey
ALTER TABLE "event"."Participant" DROP CONSTRAINT "Participant_receiverePairParticipantPublicId_fkey";

-- AlterTable
ALTER TABLE "event"."Participant" DROP COLUMN "giverPairParticipantPublicId",
DROP COLUMN "receiverePairParticipantPublicId",
ADD COLUMN     "getFromParticipantPublicId" UUID,
ADD COLUMN     "givesToParticipantPublicId" UUID;

-- AddForeignKey
ALTER TABLE "event"."Participant" ADD CONSTRAINT "Participant_givesToParticipantPublicId_fkey" FOREIGN KEY ("givesToParticipantPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."Participant" ADD CONSTRAINT "Participant_getFromParticipantPublicId_fkey" FOREIGN KEY ("getFromParticipantPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE SET NULL ON UPDATE CASCADE;
