import { Injectable } from '@nestjs/common';
import { CreateAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/create-anonim-chat-message.dto';
import { UpdateAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/update-anonim-chat-message.dto';

@Injectable()
export class AnonimChatMessagesService {
  create(createAnonimChatMessageDto: CreateAnonimChatMessageDto) {
    return 'This action adds a new anonimChatMessage';
  }

  findAll() {
    return `This action returns all anonimChatMessages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anonimChatMessage`;
  }

  update(id: number, updateAnonimChatMessageDto: UpdateAnonimChatMessageDto) {
    return `This action updates a #${id} anonimChatMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} anonimChatMessage`;
  }
}
