import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { SecretSantaEvent } from '@/src/secret-santa-events/entities/secret-santa-event.entity';
import { Organizer } from '@/src/organizers/entities/organizer.entity';
import { Participant } from '@/src/participants/entities/participant.entity';
import { OtpService } from '@/src/common/otp/otp.service';

@Injectable()
export class AppMailerService {
  private readonly logger = new Logger(AppMailerService.name);
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly otpService: OtpService
  ) {}

  async sendWhoYouAreOTPMail(
    organizer: Organizer
  ) {
    await this.mailerService.sendMail({
      to: `"${organizer.name}" <${organizer.email}>`,
      subject: 'Secret Santa Pleasure OTP verification',
      template: 'whoYouAreOTPMail',
      context: {
        title: 'OTP VERIFICATION',
        name: organizer.name,
        otp: await this.otpService.createOtp(organizer.email),
      },
    })
  }

  async sendYouAreOrganizerMail(
    organizer: Organizer
  ) {
    await this.mailerService.sendMail({
      to: `"${organizer.name}" <${organizer.email}>`,
      subject: 'You are become an organizer at Secret Santa Pleasure site',
      template: 'youAreAnOrganizerMail',
      context: {
        title: 'YOU ARE AN ORGANIZER',
        name: organizer.name,
        siteUrl: `${this.configService.get<string>('FRONTEND_SITE_URL')}/organizers/${organizer.publicId}`,
      },
    })
  }

  async sendYouArePartcipantMail(
    participant: Participant,
    secretSantaEvent: SecretSantaEvent & { organizer: { email: string, name: string } },  
  ) {
    await this.mailerService.sendMail({
      to: `"${participant.name}" <${participant.email}>`,
      subject: 'You are selected to a Sercret Santa Pleasure participant',
      template: 'youAreAPartcipantMail',
      context: {
        title: 'YOU ARE A PARTICIPANT',
        name: participant.name,
        siteUrl: `${this.configService.get<string>('FRONTEND_SITE_URL')}/events/${secretSantaEvent.publicId}/participants/${participant.publicId}`,
        giverName: participant.givesToParticipant.name,
        organizerName: secretSantaEvent.organizer.name,
        location: secretSantaEvent.location,
        spendLimit: secretSantaEvent.spendLimit,
        eventBeginAt: dayjs(secretSantaEvent.eventBeginAt).format('YYYY-MM-DD HH:mm::ss')
      },
    })
  }
}