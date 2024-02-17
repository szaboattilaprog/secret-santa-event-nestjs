import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MAILER_OPTIONS } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { AppMailerService } from '@/src/app-mailer/app-mailer.service';
import { OtpService } from '@/src/common/otp/otp.service';
import { AuthService } from '@/src/auth/auth.service';
import { OrganizersService } from '@/src/organizers/organizers.service';
import { ParticipantsService } from '@/src/participants/participants.service';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';
import { SecretSantaEventCountDownTimerGateway } from '@/src/secret-santa-events/secret-santa-event-cont-down-timer.gateway';
import { SecretSantaEventsRepository } from '@/src/secret-santa-events/entities/repositories/secret-santa-events-repository/secret-santa-events-repository';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';

describe('AnonimChatMessagesGateway', () => {
  let gateway: SecretSantaEventCountDownTimerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretSantaEventCountDownTimerGateway,
        EventEmitter2,
        MailerService,
        ConfigService,
        JwtService,
        PostgresqlPrismaService,
        AppMailerService,
        OtpService,
        AuthService,
        OrganizersService,
        ParticipantsService,
        SecretSantaEventsService,
        SecretSantaEventsRepository,
        OrganizersRepository,
        ParticipantsRepository,
        {
          provide: MAILER_OPTIONS,
          useValue: {
            transport: {
              host: 'smtp.example.com',
              port: 587,
              secure: false,
            }
          }
        },
        {
          provide: CACHE_MANAGER,
          useValue: Cache,
        },
      ],
    }).compile();

    gateway = module.get<SecretSantaEventCountDownTimerGateway>(SecretSantaEventCountDownTimerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});