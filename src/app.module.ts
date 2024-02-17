import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';
import { AppMailerModule } from '@/src/app-mailer/app-mailer.module';
import { AuthModule } from '@/src/auth/auth.module';
import { OrganizersModule } from '@/src/organizers/organizers.module';
import { SecretSantaEventsModule } from '@/src/secret-santa-events/secret-santa-events.module';
import { ParticipantsModule } from '@/src/participants/participants.module';
import { GiftWishlistsModule } from '@/src/gift-wishlists/gift-wishlists.module';
import { AnonimChatsModule } from '@/src/anonim-chats/anonim-chats.module';
import { AnonimChatMessagesModule } from '@/src/anonim-chat-messages/anonim-chat-messages.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: 'memory',
      ttl: 30 * 60 * 1000,// 30 minutes
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    EventEmitterModule.forRoot(),
    PostgresqlPrismaModule,
    AuthModule,
    AppMailerModule,
    OrganizersModule,
    SecretSantaEventsModule,
    ParticipantsModule,
    GiftWishlistsModule,
    AnonimChatsModule,
    AnonimChatMessagesModule,
  ],
})
export class AppModule {}