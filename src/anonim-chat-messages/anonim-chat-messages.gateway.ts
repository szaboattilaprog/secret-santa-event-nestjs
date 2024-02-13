import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';
import { CreateAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/create-anonim-chat-message.dto';
import { UpdateAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/update-anonim-chat-message.dto';

@WebSocketGateway()
export class AnonimChatMessagesGateway {
  constructor(
    private readonly anonimChatMessagesService: AnonimChatMessagesService,
  ) {}

  @SubscribeMessage('createAnonimChatMessage')
  create(
    @MessageBody() createAnonimChatMessageDto: CreateAnonimChatMessageDto,
  ) {
    return this.anonimChatMessagesService.create(createAnonimChatMessageDto);
  }

  @SubscribeMessage('findAllAnonimChatMessages')
  findAll() {
    return this.anonimChatMessagesService.findAll();
  }

  @SubscribeMessage('findOneAnonimChatMessage')
  findOne(@MessageBody() id: number) {
    return this.anonimChatMessagesService.findOne(id);
  }

  @SubscribeMessage('updateAnonimChatMessage')
  update(
    @MessageBody() updateAnonimChatMessageDto: UpdateAnonimChatMessageDto,
  ) {
    return this.anonimChatMessagesService.update(
      updateAnonimChatMessageDto.id,
      updateAnonimChatMessageDto,
    );
  }

  @SubscribeMessage('removeAnonimChatMessage')
  remove(@MessageBody() id: number) {
    return this.anonimChatMessagesService.remove(id);
  }
}
