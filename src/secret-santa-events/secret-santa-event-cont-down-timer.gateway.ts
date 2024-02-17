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
import dayjs from 'dayjs';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';
import { AuthService } from '@/src/auth/auth.service';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

@WebSocketGateway({ cors: { origin: '*', transports: ['websocket'] } })
export class SecretSantaEventCountDownTimerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SecretSantaEventCountDownTimerGateway.name);

  constructor(
    private readonly authService: AuthService,
    private readonly secretSantaEventsService: SecretSantaEventsService,
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
    
    this.logger.log(`Client ${client.id} connected.`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('joinToEventCountDownTimer')
  handleJoin(
    @ConnectedSocket() client: Socket, 
    @MessageBody() secretSantaEventPublicId: string
  ) {
    this.logger.log(`Client ${client.id} joined secretSantaEventPublicId: ${secretSantaEventPublicId}`);
    client.join(secretSantaEventPublicId);
  }

  @SubscribeMessage('leaveTheEventCountDownTimer')
  handleLeave(
    @ConnectedSocket() client: Socket, 
    @MessageBody() secretSantaEventPublicId: string
  ) {
    this.logger.log(`Client ${client.id} leaved chatPublicId: ${secretSantaEventPublicId}`);
    client.leave(secretSantaEventPublicId);
  }

  @SubscribeMessage('countDownToEventBeginAt')
  async handleMessage(
    @ConnectedSocket() client: Socket, 
    @MessageBody() secretSantaEventPublicId: string,
  ) {
    const secretSantaEvent = await this.secretSantaEventsService.findOne(secretSantaEventPublicId);
    setInterval(() => {
      const duration = dayjs.duration(dayjs(secretSantaEvent.eventBeginAt).diff(dayjs()));
      let days = String(Math.floor(duration.asDays()));
      if (days.length === 1) {
        days = `0${days}`;
      }
      const mhs = duration.format('HH[h] mm[m] ss[s]');
      const countBack = `${days}d ${mhs}`;
      //this.logger.log(`count back: ${countBack}`);

      /*client.emit('tick', {
        time: countBack,
      });*/

      client.to(secretSantaEventPublicId).emit('tick', {
        time: countBack,
      });
  
    }, 1000);  
  }
}