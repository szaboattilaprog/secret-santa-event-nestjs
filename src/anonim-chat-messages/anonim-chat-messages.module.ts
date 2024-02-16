import { Module } from '@nestjs/common';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';
import { AnonimChatMessagesGateway } from '@/src/anonim-chat-messages/anonim-chat-messages.gateway';
import { AnonimChatMessagesController } from '@/src/anonim-chat-messages/anonim-chat-messages.controller';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';
import { AnonimChatMessagesRepository } from '@/src/anonim-chat-messages/entities/repositories/anonim-chat-messages-repository/anonim-chat-messages-repository';

@Module({
  imports: [PostgresqlPrismaModule],
  providers: [AnonimChatMessagesGateway, AnonimChatMessagesController, AnonimChatMessagesService, AnonimChatMessagesRepository],
  //exports: [AnonimChatMessagesRepository],
})
export class AnonimChatMessagesModule {}