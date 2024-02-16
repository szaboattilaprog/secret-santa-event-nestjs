import { Injectable, Logger } from '@nestjs/common';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { CreateAnonimChatDto } from '@/src/anonim-chats/dto/create-anonim-chat.dto';
import { UpdateAnonimChatDto } from '@/src/anonim-chats/dto/update-anonim-chat.dto';
import { AnonimChat } from '@/src/anonim-chats/entities/anonim-chat.entity';

@Injectable()
export class AnonimChatsRepository {
  private readonly logger = new Logger(AnonimChatsRepository.name);

  constructor(
    private readonly postgresqlPrismaService: PostgresqlPrismaService,
  ) {}

  async create(createAnonimChatDto: CreateAnonimChatDto): Promise<AnonimChat> {
    return this.postgresqlPrismaService.anonimChat.create({ data: createAnonimChatDto });
  }

  async findAll(creatorParticipantPublicId: string): Promise<AnonimChat[]> {
    return this.postgresqlPrismaService.anonimChat.findMany({ where: { creatorParticipantPublicId } });
  }

  async findOne(publicId: string): Promise<AnonimChat> {
    return this.postgresqlPrismaService.anonimChat.findUnique({ where: { publicId } });
  }

  async update(creatorParticipantPublicId: string, publicId: string, updateAnonimChatDto: UpdateAnonimChatDto): Promise<AnonimChat> {
    return this.postgresqlPrismaService.anonimChat.update({ where: { publicId, creatorParticipantPublicId }, data: updateAnonimChatDto });
  }
}