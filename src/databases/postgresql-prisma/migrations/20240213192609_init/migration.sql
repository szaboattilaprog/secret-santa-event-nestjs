-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "account";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "base";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "event";

-- CreateTable
CREATE TABLE "account"."Organizer" (
    "id" SERIAL NOT NULL,
    "publicId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event"."SecretSantaEvent" (
    "id" SERIAL NOT NULL,
    "publicId" UUID NOT NULL,
    "location" TEXT NOT NULL,
    "spendLimit" INTEGER NOT NULL,
    "settedAllParticipants" BOOLEAN NOT NULL,
    "eventBeginAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizerPublicId" UUID NOT NULL,

    CONSTRAINT "SecretSantaEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event"."Participant" (
    "id" SERIAL NOT NULL,
    "publicId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event"."GiftPair" (
    "id" SERIAL NOT NULL,
    "publicId" UUID NOT NULL,
    "giverPublicId" UUID NOT NULL,
    "receiverPublicId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventPublicId" UUID NOT NULL,

    CONSTRAINT "GiftPair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event"."AnonimChat" (
    "id" SERIAL NOT NULL,
    "publicId" UUID NOT NULL,
    "topic" VARCHAR(255) NOT NULL,
    "organizerPublicId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventPublicId" UUID NOT NULL,

    CONSTRAINT "AnonimChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event"."AnonimChatMessage" (
    "id" SERIAL NOT NULL,
    "publicId" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chatPublicId" UUID NOT NULL,
    "participantsPublicId" UUID NOT NULL,

    CONSTRAINT "AnonimChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event"."GiftWishlist" (
    "id" SERIAL NOT NULL,
    "publicId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gitfUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "participantPublicId" UUID NOT NULL,
    "eventPublicId" UUID NOT NULL,

    CONSTRAINT "GiftWishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event"."GiftExchange" (
    "id" SERIAL NOT NULL,
    "publicId" UUID NOT NULL,
    "sendGiftAt" TIMESTAMP(3) NOT NULL,
    "receiveGiftAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "participantPublicId" UUID NOT NULL,
    "eventPublicId" UUID NOT NULL,

    CONSTRAINT "GiftExchange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event"."_ParticipantToSecretSantaEvent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_publicId_key" ON "account"."Organizer"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "SecretSantaEvent_publicId_key" ON "event"."SecretSantaEvent"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_publicId_key" ON "event"."Participant"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "GiftPair_publicId_key" ON "event"."GiftPair"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "AnonimChat_publicId_key" ON "event"."AnonimChat"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "AnonimChat_topic_key" ON "event"."AnonimChat"("topic");

-- CreateIndex
CREATE UNIQUE INDEX "AnonimChatMessage_publicId_key" ON "event"."AnonimChatMessage"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "GiftWishlist_publicId_key" ON "event"."GiftWishlist"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "GiftExchange_publicId_key" ON "event"."GiftExchange"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "_ParticipantToSecretSantaEvent_AB_unique" ON "event"."_ParticipantToSecretSantaEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_ParticipantToSecretSantaEvent_B_index" ON "event"."_ParticipantToSecretSantaEvent"("B");

-- AddForeignKey
ALTER TABLE "event"."SecretSantaEvent" ADD CONSTRAINT "SecretSantaEvent_organizerPublicId_fkey" FOREIGN KEY ("organizerPublicId") REFERENCES "account"."Organizer"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."GiftPair" ADD CONSTRAINT "GiftPair_giverPublicId_fkey" FOREIGN KEY ("giverPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."GiftPair" ADD CONSTRAINT "GiftPair_receiverPublicId_fkey" FOREIGN KEY ("receiverPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."GiftPair" ADD CONSTRAINT "GiftPair_eventPublicId_fkey" FOREIGN KEY ("eventPublicId") REFERENCES "event"."SecretSantaEvent"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."AnonimChat" ADD CONSTRAINT "AnonimChat_organizerPublicId_fkey" FOREIGN KEY ("organizerPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."AnonimChat" ADD CONSTRAINT "AnonimChat_eventPublicId_fkey" FOREIGN KEY ("eventPublicId") REFERENCES "event"."SecretSantaEvent"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."AnonimChatMessage" ADD CONSTRAINT "AnonimChatMessage_chatPublicId_fkey" FOREIGN KEY ("chatPublicId") REFERENCES "event"."AnonimChat"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."AnonimChatMessage" ADD CONSTRAINT "AnonimChatMessage_participantsPublicId_fkey" FOREIGN KEY ("participantsPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."GiftWishlist" ADD CONSTRAINT "GiftWishlist_participantPublicId_fkey" FOREIGN KEY ("participantPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."GiftWishlist" ADD CONSTRAINT "GiftWishlist_eventPublicId_fkey" FOREIGN KEY ("eventPublicId") REFERENCES "event"."SecretSantaEvent"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."GiftExchange" ADD CONSTRAINT "GiftExchange_participantPublicId_fkey" FOREIGN KEY ("participantPublicId") REFERENCES "event"."Participant"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."GiftExchange" ADD CONSTRAINT "GiftExchange_eventPublicId_fkey" FOREIGN KEY ("eventPublicId") REFERENCES "event"."SecretSantaEvent"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."_ParticipantToSecretSantaEvent" ADD CONSTRAINT "_ParticipantToSecretSantaEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "event"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event"."_ParticipantToSecretSantaEvent" ADD CONSTRAINT "_ParticipantToSecretSantaEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "event"."SecretSantaEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
