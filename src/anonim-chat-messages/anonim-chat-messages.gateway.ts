import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';
import { CreateAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/create-anonim-chat-message.dto';
import { UpdateAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/update-anonim-chat-message.dto';
import { AuthService } from '@/src/auth/auth.service';
import { Auth } from '@/src/auth/auth-decorator/auth.decorator';
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';

@WebSocketGateway({ cors: { origin: '*', transports: ['websocket'] } })
export class AnonimChatMessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(AnonimChatMessagesGateway.name);

  constructor(
    private readonly authService: AuthService,
    private readonly anonimChatMessagesService: AnonimChatMessagesService,
  ) {}
  
  async handleConnection(client: Socket) {
    const [type, token] = client.handshake.headers['authorization']?.split(' ') ?? [];
    if (type !== 'Bearer') {
      this.logger.error(`Client ${client.id} not authenticated! Disconecting...`);
      client.disconnect(true);
      return;
    }

    let payload = null;
    try {
      payload = await this.authService.verifyToken(token);
      client.handshake.auth = payload;
      this.logger.log(`Client ${client.id} authenticated with payload: ${JSON.stringify(payload)}`);
    } catch (error) {
      this.logger.error(`Client ${client.id} not authenticated! Disconecting...`);
      client.disconnect(true);
      return;
    }
    
    
    this.logger.log(`Client ${client.id} connected.`);// Auth token: ${token}
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('joinToChat')
  handleJoin(
    @ConnectedSocket() client: Socket, 
    @MessageBody() anonimChatPublicId: string
  ) {
    this.logger.log(`Client ${client.id} joined chatPublicId: ${anonimChatPublicId}`);
    client.join(anonimChatPublicId);
  }

  @SubscribeMessage('leaveTheChat')
  handleLeave(
    @ConnectedSocket() client: Socket, 
    @MessageBody() anonimChatPublicId: string
  ) {
    this.logger.log(`Client ${client.id} leaved chatPublicId: ${anonimChatPublicId}`);
    client.leave(anonimChatPublicId);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket, 
    @MessageBody() data: string,
  ) {
    this.logger.log(`Client ${client.id} sended this: ${JSON.stringify(client.handshake.auth)}`);
    const createAnonimChatMessageDto: CreateAnonimChatMessageDto = { ...JSON.parse(data), participantPublicId: client.handshake.auth.publicId };
    this.logger.log(
      `Client ${client.id} sended message: ${createAnonimChatMessageDto.message} to chatPublicId: ${createAnonimChatMessageDto.chatPublicId}`,
    );
    const message = await this.anonimChatMessagesService.create(createAnonimChatMessageDto);
    //client.emit('message', message);
    client.to(message.chatPublicId).emit('message', message);
  }

  @SubscribeMessage('isTyping')
  async handleTypingNotification(
    @ConnectedSocket() client: Socket, 
    @MessageBody() anonimChatPublicId: string
  ) {
    this.logger.log(`Client ${client.id} typing message to chatPublicId: ${anonimChatPublicId}`);
    /*client
      .emit('isTyping', `${client.id} typing message...`);*/
    client
      .to(anonimChatPublicId)
      .emit('isTyping', `${client.id} typing message...`);
  }
}