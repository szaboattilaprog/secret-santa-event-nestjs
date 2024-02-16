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
import { ParticipantsService } from '@/src/participants/participants.service';
import { CreateParticipantDto } from '@/src/participants/dto/create-participant.dto';
import { UpdateByCreatorParticipantDto } from '@/src/participants/dto/update-by-creator-participant.dto';
import { UpdateParticipantDto } from '@/src/participants/dto/update-participant.dto';
import { FindAllParticipantDto } from '@/src/participants/dto/find-all-participant.dto';
import { CreatorAuthGuard } from '@/src/auth/creator-auth/creator-auth.guard';
import { PartcipantAuthGuard } from '@/src/auth/partcipant-auth/partcipant-auth.guard';
import { Auth } from '@/src/auth/auth/auth.decorator'
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';
import { Participant } from '@/src/participants/entities/participant.entity';

@ApiTags('Participants')
@ApiBearerAuth()
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @UseGuards(CreatorAuthGuard)
  @ApiOperation({ summary: 'Create a participant' })
  @ApiResponse({ type: Participant, status: 201 })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for Participant' })
  create(
    @Body() createParticipantDto: CreateParticipantDto
  ): Promise<Participant> {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  @UseGuards(CreatorAuthGuard)
  @ApiOperation({ summary: 'Get all participants for Secret Sante event' })
  @ApiResponse({ type: [Participant], status: 200 })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for Participant' })
  findAll(
    @Body() findAllParticipantDto: FindAllParticipantDto
  ): Promise<Participant[]> {
    return this.participantsService.findAll(findAllParticipantDto);
  }
  
  @Get(':publicId')
  @ApiOperation({ summary: 'Get a participant for Secret Sante event' })
  @ApiResponse({ type: Participant, status: 200 })
  @ApiResponse({ status: 404, description: 'Participant not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for Participant' })
  async findOne(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string
  ): Promise<Partial<Participant>> {
    if (auth.publicIdType === 'participant' && auth.publicId !== publicId) {
      throw new NotAcceptableException('Has not access for participant');
    }

    const participant = await this.participantsService.findOne(publicId);
    if (auth.publicIdType === 'participant') {
      const { getFromParticipantPublicId, ...returnParticipant } = participant;

      return returnParticipant;
    }

    return participant;
  }

  @Patch(':publicId/by-creator')
  @ApiOperation({ summary: 'Update a participant by creator for Secret Sante event' })
  @UseGuards(CreatorAuthGuard)
  @ApiResponse({ type: Participant, status: 200 })
  @ApiResponse({ status: 404, description: 'Participant not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for Participant' })
  updateByCreator(
    @Param('publicId') publicId: string,
    @Body() updateByCreatorParticipantDto: UpdateByCreatorParticipantDto,
  ): Promise<Participant> {
    return this.participantsService.update(publicId, updateByCreatorParticipantDto);
  }

  @Patch(':publicId')
  @ApiOperation({ summary: 'Update a participant for Secret Sante event' })
  @UseGuards(PartcipantAuthGuard)
  @ApiResponse({ type: Participant, status: 200 })
  @ApiResponse({ status: 404, description: 'Participant not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for Participant' })
  update(
    @Param('publicId') publicId: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    return this.participantsService.update(publicId, updateParticipantDto);
  }

  @Delete(':publicId')
  @ApiOperation({ summary: 'Delete a participant for Secret Sante event' })
  @UseGuards(CreatorAuthGuard)
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Participant not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for Participant' })
  remove(
    @Param('publicId') publicId: string
  ) {
    return this.participantsService.remove(publicId);
  }
}