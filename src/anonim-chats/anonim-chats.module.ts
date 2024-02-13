import { Module } from '@nestjs/common';
import { AnonimChatsService } from '@/src/anonim-chats/anonim-chats.service';
import { AnonimChatsController } from '@/src/anonim-chats/anonim-chats.controller';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';

@Module({
  imports: [PostgresqlPrismaModule],
  controllers: [AnonimChatsController],
  providers: [AnonimChatsService],
})
export class AnonimChatsModule {}
