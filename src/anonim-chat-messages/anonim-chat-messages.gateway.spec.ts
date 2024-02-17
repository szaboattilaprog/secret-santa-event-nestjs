import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { MAILER_OPTIONS } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { AppMailerService } from '@/src/app-mailer/app-mailer.service';
import { OtpService } from '@/src/common/otp/otp.service';
import { AuthService } from '@/src/auth/auth.service';
import { OrganizersService } from '@/src/organizers/organizers.service';
import { ParticipantsService } from '@/src/participants/participants.service';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';
import { AnonimChatMessagesGateway } from '@/src/anonim-chat-messages/anonim-chat-messages.gateway';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';
import { AnonimChatMessagesRepository } from '@/src/anonim-chat-messages/entities/repositories/anonim-chat-messages-repository/anonim-chat-messages-repository';

describe('AnonimChatMessagesGateway', () => {
  let gateway: AnonimChatMessagesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnonimChatMessagesGateway,
        MailerService,
        ConfigService,
        JwtService,
        PostgresqlPrismaService,
        AppMailerService,
        OtpService, 
        AuthService,
        OrganizersService,
        ParticipantsService,
        AnonimChatMessagesService, 
        OrganizersRepository,
        ParticipantsRepository,
        AnonimChatMessagesRepository,
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

    gateway = module.get<AnonimChatMessagesGateway>(AnonimChatMessagesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});