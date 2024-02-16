import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotAcceptableException
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';
import { CreateSecretSantaEventDto } from '@/src/secret-santa-events/dto/create-secret-santa-event.dto';
import { UpdateSecretSantaEventDto } from '@/src/secret-santa-events/dto/update-secret-santa-event.dto';
import { SecretSantaEvent } from './entities/secret-santa-event.entity'
import { Auth } from '@/src/auth/auth/auth.decorator'
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';
import { CreatorAuthGuard } from '@/src/auth/creator-auth/creator-auth.guard';

@ApiTags('Secret Santa Events')
@ApiBearerAuth()
@UseGuards(CreatorAuthGuard)
@Controller('secret-santa-events')
export class SecretSantaEventsController {
  constructor(
    private readonly secretSantaEventsService: SecretSantaEventsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a Secret Santa event' })
  @ApiResponse({ type: SecretSantaEvent, status: 201 })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Secret Santa event' })
  @ApiResponse({ status: 406, description: 'Has not access for Secret Santa event' })
  create(
    @Auth() auth: AccessAuth,
    @Body() createSecretSantaEventDto: CreateSecretSantaEventDto): Promise<SecretSantaEvent> {
    return this.secretSantaEventsService.create(auth.publicId, createSecretSantaEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Secret Santa event for creator' })
  @ApiResponse({ type: [SecretSantaEvent], status: 200 })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Secret Santa event' })
  @ApiResponse({ status: 406, description: 'Has not access for Secret Santa event' })
  findAll(
    @Auth() auth: AccessAuth,
  ) {
    return this.secretSantaEventsService.findAll(auth.publicId);
  }

  @Get(':publicId')
  @ApiOperation({ summary: 'Get a Secret Santa event by public id' })
  @ApiResponse({ type: SecretSantaEvent, status: 200 })
  @ApiResponse({ status: 404, description: 'Secret Santa event not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Secret Santa event' })
  @ApiResponse({ status: 406, description: 'Has not access for Secret Santa event' })
  async findOne(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string
  ): Promise<SecretSantaEvent> {
    const secretSantaEvent = await this.secretSantaEventsService.findOne(publicId);

    if (secretSantaEvent.creatorPublicId !== auth.publicId) {
      throw new NotAcceptableException('Has not access for Secret Santa event');
    }

    return secretSantaEvent;
  }

  @Patch(':publicId')
  @ApiOperation({ summary: 'Update a Secret Santa event by public id' })
  @ApiResponse({ type: SecretSantaEvent, status: 200 })
  @ApiResponse({ status: 404, description: 'Secret Santa event not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Secret Santa event' })
  @ApiResponse({ status: 406, description: 'Has not access for Secret Santa event' })
  update(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string,
    @Body() updateSecretSantaEventDto: UpdateSecretSantaEventDto,
  ): Promise<SecretSantaEvent> {
    return this.secretSantaEventsService.update(auth.publicId, publicId, updateSecretSantaEventDto);
  }

  @Delete(':publicId')
  @ApiOperation({ summary: 'Remove a Secret Santa event by public id' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Secret Santa event not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Secret Santa event' })
  @ApiResponse({ status: 406, description: 'Has not access for Secret Santa event' })
  remove(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string
  ) {
    this.secretSantaEventsService.remove(auth.publicId, publicId);
  }
}