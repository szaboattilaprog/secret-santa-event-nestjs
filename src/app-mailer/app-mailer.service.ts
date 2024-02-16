import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { SecretSantaEvent } from '@/src/secret-santa-events/entities/secret-santa-event.entity';


@Injectable()
export class AppMailerService {
  private readonly logger = new Logger(AppMailerService.name);
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  async sendYouArePartcipantMail(
    toName: string, 
    toEmail: string, 
    secretSantaEvent: SecretSantaEvent & { creator: { email: string, name: string } },  
    giverName: string, 
    eventPublicId: string, 
    participantPublicId: string
  ) {
    await this.mailerService.sendMail({
      to: `"${toName}" <${toEmail}>`,
      subject: 'You are selected to a sercret santa pleasure participant',
      template: './youAreAPartcipantMail',
      context: {
        siteUrl: `${this.configService.get<string>('SITE_URL')}/event/${eventPublicId}/participant/${participantPublicId}`,
        participantName: toName,
        giverName,
        creatorName: secretSantaEvent.creator.name,
        location: secretSantaEvent.location,
        spendLimit: secretSantaEvent.spendLimit,
        eventBeginAt: dayjs(secretSantaEvent.eventBeginAt).format('YYYY-MM-DD HH:mm::ss'),
      },
    })
  }
}
