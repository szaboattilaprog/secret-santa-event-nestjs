import { Injectable, Logger } from '@nestjs/common';
import { AnonimChatMessage } from '@prisma/client';
import { CreateAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/create-anonim-chat-message.dto';
import { FindAllAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/find-all-anonim-chat-message.dto';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';

@Injectable()
export class AnonimChatMessagesRepository {
  private readonly logger = new Logger(AnonimChatMessagesRepository.name);

  constructor(
    private readonly postgresqlPrismaService: PostgresqlPrismaService,
  ) {}

  async create(createAnonimChatMessageDto: CreateAnonimChatMessageDto): Promise<AnonimChatMessage> {
    this.logger.log('Creating a new anonim chat message');
    return this.postgresqlPrismaService.anonimChatMessage.create({
      data: {
        ...createAnonimChatMessageDto,
      },
    });
  }

  async findAll(findAllAnonimChatMessageDto: FindAllAnonimChatMessageDto): Promise<AnonimChatMessage[]> {
    this.logger.log('Finding all anonim chat messages');
    return this.postgresqlPrismaService.anonimChatMessage.findMany({
      where: {
        ...findAllAnonimChatMessageDto,
      },
      include: {
        chat: {
          select: {
            topic: true,
          },
        },
      },
    });
  }
}