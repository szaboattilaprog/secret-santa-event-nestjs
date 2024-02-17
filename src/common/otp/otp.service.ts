import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async createOtp(email: string): Promise<number> {
    const otp = this.randomNumber(6);
    const key = `otp:${email}`;

    this.logger.log('store verify-key', key);

    await this.cacheManager.set(key, otp);

    const storedOtp = await this.cacheManager.get(key);

    this.logger.log('store verify-otp', storedOtp, otp);

    return otp;
  }

  async deleteOtp (email: string): Promise<void> {
      const key = `otp:${email}`;

      this.logger.log('delete-verify-key', key);

      await this.cacheManager.del(key);
  }

  async verifyOtp(email: string, otp: number): Promise<boolean> {
    const key = `otp:${email}`;

    this.logger.log('verify-key', key);
    
    const storedOtp = await this.cacheManager.get(key);

    this.logger.log('verify-otp', storedOtp, otp);

    return otp === storedOtp;
  }

  private randomNumber(length: number): number {
    let text = '';
    const possible = '123456789';
    while (text.length < length) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return Number(text);
  }
}