import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MAILER_OPTIONS } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { AppMailerService } from '@/src/app-mailer/app-mailer.service';
import { OtpService } from '@/src/common/otp/otp.service';
import { MakeGiftPairsListener } from './make-gift-pairs-listener';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';
import { SecretSantaEventsRepository } from '@/src/secret-santa-events/entities/repositories/secret-santa-events-repository/secret-santa-events-repository';

describe('MakeGiftPairsListener', () => {
  let listener: MakeGiftPairsListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MakeGiftPairsListener,
        MailerService,
        ConfigService,
        PostgresqlPrismaService,
        AppMailerService,
        OtpService,
        ParticipantsRepository,
        SecretSantaEventsRepository,
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

    listener = module.get<MakeGiftPairsListener>(MakeGiftPairsListener);
  });

  it('should be defined', () => {
    expect(listener).toBeDefined();
  });
});