import { Controller, Post, Body, Get, Logger } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '@/src/auth/auth.service';
import { CreateCreatorAuthDto } from '@/src/auth/dto/create-creator-auth.dto';
import { CreatePartcipantAuthDto } from '@/src/auth/dto/create-partcipant-auth.dto';
import { Public } from '@/src/auth/public/public.decorator';
import { RefreshToken } from '@/src/auth/refresh-token/refresh-token.decorator';
import { AccessToken } from '@/src/auth/entities/access-token.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Get('refresh-creator-token')
  @Public()
  @ApiOperation({ summary: 'Refresh access-token for Creator of secret Santa event' })
  @ApiResponse({ type: AccessToken, status: 200, description: 'Return access-token' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access' })
  refreshCreatorToken(
    @RefreshToken() refreshToken: string
  ) {
    return this.authService.refreshCreatorToken(refreshToken);
  }

  @Get('refresh-partcipant-token')
  @Public()
  @ApiOperation({ summary: 'Refresh access-token for Partcipant of secret Santa event' })
  @ApiResponse({ type: AccessToken, status: 200, description: 'Return access-token' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access' })
  refreshPartcipantToken(
    @RefreshToken() refreshToken: string
  ) {
    return this.authService.refreshPartcipantToken(refreshToken);
  }

  @Post('creator-auth')
  @Public()
  @ApiOperation({ summary: 'Create an access-token for Creator of secret Santa event' })
  @ApiResponse({ type: AccessToken, status: 200, description: 'Return access-token' })
  @ApiResponse({ status: 404, description: 'Creator not found by public id' })
  createJwtByCreatorPublicId(@Body() createCreatorAuthDto: CreateCreatorAuthDto) {
    return this.authService.createJwtByCreatorPublicId(createCreatorAuthDto.publicId);
  }

  @Post('partcipant-auth')
  @Public()
  @ApiOperation({ summary: 'Create an access-token for Partcipant of secret Santa event' })
  @ApiResponse({ type: AccessToken, status: 200, description: 'Return access-token' })
  @ApiResponse({ status: 404, description: 'Partcipant not found by public id' })
  createJwtByPartcipantPublicId(@Body() createPartcipantAuthDto: CreatePartcipantAuthDto) {
    return this.authService.createJwtByPartcipantPublicId(createPartcipantAuthDto.publicId);
  }
}