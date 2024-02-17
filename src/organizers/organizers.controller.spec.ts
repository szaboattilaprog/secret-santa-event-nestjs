import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MAILER_OPTIONS } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { AppMailerService } from '@/src/app-mailer/app-mailer.service';
import { OtpService } from '@/src/common/otp/otp.service';
import { OrganizersService } from '@/src/organizers/organizers.service';
import { OrganizersController } from '@/src/organizers/organizers.controller';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';

describe('OrganizersController', () => {
  let controller: OrganizersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizersController],
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

    controller = module.get<OrganizersController>(OrganizersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});