/*
  Warnings:

  - A unique constraint covering the columns `[eventPublicId,email]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Participant_eventPublicId_email_key" ON "event"."Participant"("eventPublicId", "email");
