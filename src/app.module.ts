import { Module } from '@nestjs/common';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';
import { CreatorsModule } from '@/src/creators/creators.module';
import { SecretSantaEventsModule } from '@/src/secret-santa-events/secret-santa-events.module';
import { ParticipantsModule } from '@/src/participants/participants.module';
import { AnonimChatsModule } from '@/src/anonim-chats/anonim-chats.module';
import { GiftWishlistsModule } from '@/src/gift-wishlists/gift-wishlists.module';
import { AnonimChatMessagesModule } from '@/src/anonim-chat-messages/anonim-chat-messages.module';

@Module({
  imports: [
    PostgresqlPrismaModule,
    CreatorsModule,
    SecretSantaEventsModule,
    ParticipantsModule,
    AnonimChatsModule,
    GiftWishlistsModule,
    AnonimChatMessagesModule,
  ],
})
export class AppModule {}
