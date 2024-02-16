import { Injectable } from '@nestjs/common';
import { CreateAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/create-anonim-chat-message.dto';
import { FindAllAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/find-all-anonim-chat-message.dto';
import { AnonimChatMessagesRepository } from '@/src/anonim-chat-messages/entities/repositories/anonim-chat-messages-repository/anonim-chat-messages-repository';
import { AnonimChatMessage } from '@/src/anonim-chat-messages/entities/anonim-chat-message.entity';

@Injectable()
export class AnonimChatMessagesService {
  constructor(
    private anonimChatMessagesRepository: AnonimChatMessagesRepository
  ) {
  }

  async create(createAnonimChatMessageDto: CreateAnonimChatMessageDto): Promise<AnonimChatMessage> {
    const anonimChatMessage = await this.anonimChatMessagesRepository.create(createAnonimChatMessageDto);

    delete anonimChatMessage.id;

    return anonimChatMessage;
  }

  async findAll(findAllAnonimChatMessageDto: FindAllAnonimChatMessageDto): Promise<AnonimChatMessage[]> {
    const anonimChatMessages = await this.anonimChatMessagesRepository.findAll(findAllAnonimChatMessageDto);

    return anonimChatMessages.map(anonimChatMessage => {
      delete anonimChatMessage.id;
      return anonimChatMessage;
    });
  }
}