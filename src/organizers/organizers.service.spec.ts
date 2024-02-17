import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MAILER_OPTIONS } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { AppMailerService } from '@/src/app-mailer/app-mailer.service';
import { OtpService } from '@/src/common/otp/otp.service';
import { OrganizersService } from '@/src/organizers/organizers.service';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';

describe('OrganizersService', () => {
  let service: OrganizersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizersService,
        MailerService,
        ConfigService,
        PostgresqlPrismaService, 
        AppMailerService,
        OtpService,
        OrganizersRepository, 
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

    service = module.get<OrganizersService>(OrganizersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});