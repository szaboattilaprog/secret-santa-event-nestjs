import { Module } from '@nestjs/common';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';
import { AnonimChatMessagesGateway } from '@/src/anonim-chat-messages/anonim-chat-messages.gateway';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';

@Module({
  imports: [PostgresqlPrismaModule],
  providers: [AnonimChatMessagesGateway, AnonimChatMessagesService],
})
export class AnonimChatMessagesModule {}
