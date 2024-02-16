import { Test, TestingModule } from '@nestjs/testing';
import { AppMailerService } from '@/src/app-mailer/app-mailer.service';

describe('MailerService', () => {
  let service: AppMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppMailerService],
    }).compile();

    service = module.get<AppMailerService>(AppMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
