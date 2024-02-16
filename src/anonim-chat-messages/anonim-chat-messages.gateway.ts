import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';
import { CreateAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/create-anonim-chat-message.dto';
import { UpdateAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/update-anonim-chat-message.dto';
import { AuthService } from '@/src/auth/auth.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class AnonimChatMessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(AnonimChatMessagesGateway.name);
  constructor(
    private readonly authService: AuthService,
    private readonly anonimChatMessagesService: AnonimChatMessagesService,
  ) {}
  
  handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    const payload = this.authService.verifyToken(token);

    if (!payload) {
      client.disconnect(true);
    } else {
      this.logger.log(`Client ${client.id} connected. Auth token: ${token}`);
    }
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, @MessageBody() anonimChatPublicId: string) {
    this.logger.log(`Client ${client.id} joined chatPublicId: ${anonimChatPublicId}`);
    client.join(anonimChatPublicId);
    return anonimChatPublicId;
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, @MessageBody() anonimChatPublicId: string) {
    this.logger.log(`Client ${client.id} leaved chatPublicId: ${anonimChatPublicId}`);
    client.leave(anonimChatPublicId);
    return anonimChatPublicId;
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, @MessageBody() createAnonimChatMessageDto: CreateAnonimChatMessageDto) {
    this.logger.log(
      `Client ${client.id} sended message: ${createAnonimChatMessageDto.message} to chatPublicId: ${createAnonimChatMessageDto.chatPublicId}`,
    );
    const message = await this.anonimChatMessagesService.create(createAnonimChatMessageDto);
    client.emit('message', message);
    client.to(message.chatPublicId).emit('message', message);
  }

  @SubscribeMessage('isTyping')
  async handleTypingNotification(client: Socket, @MessageBody() anonimChatPublicId: string) {
    this.logger.log(`Client ${client.id} typing message to chatPublicId: ${anonimChatPublicId}`);
    client
      .to(anonimChatPublicId)
      .emit('isTyping', `${client.id} typing message...`);
  }


  /*@SubscribeMessage('createAnonimChatMessage')
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
  }*/

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }
}