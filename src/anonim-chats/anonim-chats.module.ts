import { Module } from '@nestjs/common';
import { AnonimChatsService } from '@/src/anonim-chats/anonim-chats.service';
import { AnonimChatsController } from '@/src/anonim-chats/anonim-chats.controller';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';
import { AnonimChatsRepository } from '@/src/anonim-chats/entities/repositories/anonim-chats-repository/anonim-chats-repository';

@Module({
  imports: [PostgresqlPrismaModule],
  controllers: [AnonimChatsController],
  providers: [AnonimChatsService, AnonimChatsRepository],
})
export class AnonimChatsModule {}