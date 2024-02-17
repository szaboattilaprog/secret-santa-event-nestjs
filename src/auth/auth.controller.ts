import { Controller, Post, Body, Get, Logger } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '@/src/auth/auth.service';
import { CreateOrganizerAuthDto } from '@/src/auth/dto/create-organizer-auth.dto';
import { CreatePartcipantAuthDto } from '@/src/auth/dto/create-partcipant-auth.dto';
import { IsPublic } from '@/src/auth/is-public-decorator/is-public.decorator';
import { RefreshToken } from '@/src/auth/refresh-token-decorator/refresh-token.decorator';
import { AccessToken } from '@/src/auth/entities/access-token.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Get('refresh-organizer-token')
  @IsPublic()
  @ApiOperation({ summary: 'Refresh access-token for Organizer of secret Santa event' })
  @ApiResponse({ type: AccessToken, status: 200, description: 'Return access-token' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access' })
  refreshOrganizerToken(
    @RefreshToken() refreshToken: string
  ) {
    return this.authService.refreshOrganizerToken(refreshToken);
  }

  @Get('refresh-partcipant-token')
  @IsPublic()
  @ApiOperation({ summary: 'Refresh access-token for Partcipant of secret Santa event' })
  @ApiResponse({ type: AccessToken, status: 200, description: 'Return access-token' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access' })
  refreshPartcipantToken(
    @RefreshToken() refreshToken: string
  ) {
    return this.authService.refreshPartcipantToken(refreshToken);
  }

  @Post('organizer-auth')
  @IsPublic()
  @ApiOperation({ summary: 'Create an access-token for Organizer of secret Santa event' })
  @ApiResponse({ type: AccessToken, status: 200, description: 'Return access-token' })
  @ApiResponse({ status: 404, description: 'Organizer not found by public id' })
  createJwtByOrganizerPublicId(@Body() createOrganizerAuthDto: CreateOrganizerAuthDto) {
    return this.authService.createJwtByOrganizerPublicId(createOrganizerAuthDto.publicId);
  }

  @Post('partcipant-auth')
  @IsPublic()
  @ApiOperation({ summary: 'Create an access-token for Partcipant of secret Santa event' })
  @ApiResponse({ type: AccessToken, status: 200, description: 'Return access-token' })
  @ApiResponse({ status: 404, description: 'Partcipant not found by public id' })
  createJwtByPartcipantPublicId(@Body() createPartcipantAuthDto: CreatePartcipantAuthDto) {
    return this.authService.createJwtByPartcipantPublicId(createPartcipantAuthDto.publicId);
  }
}