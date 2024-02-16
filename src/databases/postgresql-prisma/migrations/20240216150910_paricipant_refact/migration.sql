/*
  Warnings:

  - You are about to drop the `GiftExchange` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GiftPair` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ParticipantToSecretSantaEvent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventPublicId` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event"."GiftExchange" DROP CONSTRAINT "GiftExchange_eventPublicId_fkey";

-- DropForeignKey
ALTER TABLE "event"."GiftExchange" DROP CONSTRAINT "GiftExchange_participantPublicId_fkey";

-- DropForeignKey
ALTER TABLE "event"."GiftPair" DROP CONSTRAINT "GiftPair_eventPublicId_fkey";

-- DropForeignKey
ALTER TABLE "event"."GiftPair" DROP CONSTRAINT "GiftPair_giverPublicId_fkey";

-- DropForeignKey
ALTER TABLE "event"."GiftPair" DROP CONSTRAINT "GiftPair_receiverPublicId_fkey";

-- DropForeignKey
ALTER TABLE "event"."_ParticipantToSecretSantaEvent" DROP CONSTRAINT "_ParticipantToSecretSantaEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "event"."_ParticipantToSecretSantaEvent" DROP CONSTRAINT "_ParticipantToSecretSantaEvent_B_fkey";

-- AlterTable
ALTER TABLE "event"."Participant" ADD COLUMN     "eventPublicId" UUID NOT NULL,
ADD COLUMN     "giverPairParticipantPublicId" UUID,
ADD COLUMN     "receiveGiftAt" TIMESTAMP(3),
ADD COLUMN     "receiverePairParticipantPublicId" UUID,
ADD COLUMN     "sendGiftAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "event"."GiftExchange";

-- DropTable
DROP TABLE "event"."GiftPair";

-- DropTable
DROP TABLE "event"."_ParticipantToSecretSantaEvent";

-- AddForeignKey
ALTER TABLE "event"."Participant" ADD CONSTRAINT "Participant_eventPublicId_fkey" FOREIGN KEY ("eventPublicId") REFERENCES "event"."SecretSantaEvent"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."Participant" ADD CONSTRAINT "Participant_giverPairParticipantPublicId_fkey" FOREIGN KEY ("giverPairParticipantPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."Participant" ADD CONSTRAINT "Participant_receiverePairParticipantPublicId_fkey" FOREIGN KEY ("receiverePairParticipantPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE SET NULL ON UPDATE CASCADE;
