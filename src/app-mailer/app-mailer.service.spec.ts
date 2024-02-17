import { Test, TestingModule } from '@nestjs/testing';
import { MAILER_OPTIONS } from '@nestjs-modules/mailer';
import { AppMailerService } from '@/src/app-mailer/app-mailer.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

describe('MailerService', () => {
  let service: AppMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppMailerService, 
        MailerService, 
        ConfigService,
        {
          provide: MAILER_OPTIONS,
          useFactory: () => ({
            defaults: {},
            transport: {},
            transports: {
              default: {
                  host: 'smtp.example.com',
                  port: 587,
                  secure: false,
                  auth: {
                      user: '',
                      pass: '',
                  },
              },
              template: {
                  dir: 'src/templates',
                  adapter: undefined,
                  options: {
                      strict: true,
                  }
              },
              options: {
                  partials: {},
                  helpers: {},
                  compilerOptions: {},
              },
              preview: false,
            }
          })
        },
      ],
    }).compile();

    service = module.get<AppMailerService>(AppMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});