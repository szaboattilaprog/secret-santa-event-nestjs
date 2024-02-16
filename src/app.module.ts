import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';
import { AppMailerModule } from '@/src/app-mailer/app-mailer.module';
import { AuthModule } from '@/src/auth/auth.module';
import { CreatorsModule } from '@/src/creators/creators.module';
import { SecretSantaEventsModule } from '@/src/secret-santa-events/secret-santa-events.module';
import { ParticipantsModule } from '@/src/participants/participants.module';
import { AnonimChatsModule } from '@/src/anonim-chats/anonim-chats.module';
import { GiftWishlistsModule } from '@/src/gift-wishlists/gift-wishlists.module';
import { AnonimChatMessagesModule } from '@/src/anonim-chat-messages/anonim-chat-messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    EventEmitterModule.forRoot(),
    PostgresqlPrismaModule,
    AuthModule,
    AppMailerModule,
    CreatorsModule,
    SecretSantaEventsModule,
    ParticipantsModule,
    AnonimChatsModule,
    GiftWishlistsModule,
    AnonimChatMessagesModule,
  ],
})
export class AppModule {}