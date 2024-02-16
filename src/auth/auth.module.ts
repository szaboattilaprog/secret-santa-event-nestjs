import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@/src/auth/auth.service';
import { AuthController } from '@/src/auth/auth.controller';
import { JwtAuthGuard } from '@/src/auth/jwt-auth/jwt-auth.guard';
import { CreatorAuthGuard } from '@/src/auth/creator-auth/creator-auth.guard';
import { PartcipantAuthGuard } from '@/src/auth/partcipant-auth/partcipant-auth.guard';
import { CreatorsModule } from '@/src/creators/creators.module';
import { ParticipantsModule } from '@/src/participants/participants.module';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    CreatorsModule,
    ParticipantsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    CreatorAuthGuard,
    PartcipantAuthGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}