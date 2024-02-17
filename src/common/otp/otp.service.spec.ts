import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { OtpService } from '@/src/common/otp/otp.service';

describe('OtpService', () => {
  let service: OtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpService,
        {
          provide: CACHE_MANAGER,
          useValue: Cache,
        },
      ],
    }).compile();

    service = module.get<OtpService>(OtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});