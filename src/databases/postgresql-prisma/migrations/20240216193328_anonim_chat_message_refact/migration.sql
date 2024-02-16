/*
  Warnings:

  - You are about to drop the column `participantsPublicId` on the `AnonimChatMessage` table. All the data in the column will be lost.
  - Added the required column `participantPublicId` to the `AnonimChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event"."AnonimChatMessage" DROP CONSTRAINT "AnonimChatMessage_participantsPublicId_fkey";

-- AlterTable
ALTER TABLE "event"."AnonimChatMessage" DROP COLUMN "participantsPublicId",
ADD COLUMN     "participantPublicId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "event"."AnonimChatMessage" ADD CONSTRAINT "AnonimChatMessage_participantPublicId_fkey" FOREIGN KEY ("participantPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;
