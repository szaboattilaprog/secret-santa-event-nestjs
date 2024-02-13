import { Injectable } from '@nestjs/common';
import { CreateAnonimChatDto } from '@/src/anonim-chats/dto/create-anonim-chat.dto';
import { UpdateAnonimChatDto } from '@/src/anonim-chats/dto/update-anonim-chat.dto';

@Injectable()
export class AnonimChatsService {
  create(createAnonimChatDto: CreateAnonimChatDto) {
    return 'This action adds a new anonimChat';
  }

  findAll() {
    return `This action returns all anonimChats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anonimChat`;
  }

  update(id: number, updateAnonimChatDto: UpdateAnonimChatDto) {
    return `This action updates a #${id} anonimChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} anonimChat`;
  }
}
