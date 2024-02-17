import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateAnonimChatDto } from '@/src/anonim-chats/dto/create-anonim-chat.dto';
import { UpdateAnonimChatDto } from '@/src/anonim-chats/dto/update-anonim-chat.dto';
import { AnonimChatsRepository } from '@/src/anonim-chats/entities/repositories/anonim-chats-repository/anonim-chats-repository';
import { AnonimChat } from '@/src/anonim-chats/entities/anonim-chat.entity';

@Injectable()
export class AnonimChatsService {
  private readonly logger = new Logger(AnonimChatsService.name);
  constructor(
    private anonimChatsRepository: AnonimChatsRepository
  ) {
  }

  async create(createAnonimChatDto: CreateAnonimChatDto): Promise<AnonimChat> {
    let anonimChat: AnonimChat | null = null;
    try {
      anonimChat = await this.anonimChatsRepository.create(createAnonimChatDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          this.logger.error('The AnonimChat already exists', error)
          throw new BadRequestException('The AnonimChat already exists', { cause: createAnonimChatDto.topic });
        }
      }

      this.logger.error(error, 'Error creating AnonimChat');
      throw new BadRequestException('Error creating AnonimChat');
    }

    if (!anonimChat) {
      throw new BadRequestException('Error creating AnonimChat');
    }

    delete anonimChat.id;

    return anonimChat;
  }

  async findAll(participantPublicId: string): Promise<AnonimChat[]> {
    const anonimChats = await this.anonimChatsRepository.findAll(participantPublicId);

    return anonimChats.map(anonimChat => {
      delete anonimChat.id;
      return anonimChat;
    });
  }

  async findOne(publicId: string): Promise<AnonimChat> {
    const anonimChat = await this.anonimChatsRepository.findOne(publicId);

    if (!anonimChat) {
      throw new NotFoundException('AnonimChat not found');
    }

    delete anonimChat.id;

    return anonimChat;
  }

  async update(participantPublicId: string, publicId: string, updateAnonimChatDto: UpdateAnonimChatDto): Promise<AnonimChat> {
    const anonimChat = await this.anonimChatsRepository.update(participantPublicId, publicId, updateAnonimChatDto);

    if (!anonimChat) {
      throw new NotFoundException('AnonimChat not found');
    }

    delete anonimChat.id;

    return anonimChat;
  }
}