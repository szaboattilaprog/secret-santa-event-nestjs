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
import { UpdateByOrganizerParticipantDto } from '@/src/participants/dto/update-by-organizer-participant.dto';
import { UpdateParticipantDto } from '@/src/participants/dto/update-participant.dto';
import { FindAllParticipantDto } from '@/src/participants/dto/find-all-participant.dto';
import { OrganizerAuthVerifiedGuard } from '@/src/auth/organizer-auth-guard/organizer-auth-verified.guard';
import { ParticipantAuthGuard } from '@/src/auth/participant-auth-guard/participant-auth.guard';
import { Auth } from '@/src/auth/auth-decorator/auth.decorator'
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';
import { Participant } from '@/src/participants/entities/participant.entity';

@ApiTags('Participants')
@ApiBearerAuth()
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @UseGuards(OrganizerAuthVerifiedGuard)
  @ApiOperation({ summary: 'Create a participant' })
  @ApiResponse({ type: Participant, status: 201 })
  @ApiResponse({ status: 400, description: 'Error creating Participant' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access create Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for create Participant' })
  create(
    @Body() createParticipantDto: CreateParticipantDto
  ): Promise<Participant> {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  @UseGuards(OrganizerAuthVerifiedGuard)
  @ApiOperation({ summary: 'Get all participants for Secret Sante event' })
  @ApiResponse({ type: [Participant], status: 200 })
  @ApiResponse({ status: 401, description: 'Unauthorized for access get Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for get Participant' })
  findAll(
    @Body() findAllParticipantDto: FindAllParticipantDto
  ): Promise<Participant[]> {
    return this.participantsService.findAll(findAllParticipantDto);
  }
  
  @Get(':publicId')
  @ApiOperation({ summary: 'Get a participant for Secret Sante event' })
  @ApiResponse({ type: Participant, status: 200 })
  @ApiResponse({ status: 404, description: 'Participant not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access get Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for get Participant' })
  async findOne(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string
  ): Promise<Partial<Participant>> {
    if (auth.publicIdType === 'participant' && auth.publicId !== publicId) {
      throw new NotAcceptableException('Has not access for get participant');
    }

    const participant = await this.participantsService.findOne(publicId);
    if (auth.publicIdType === 'participant') {
      const { getFromParticipantPublicId, ...returnParticipant } = participant;

      return returnParticipant;
    }

    return participant;
  }

  @Patch(':publicId/by-organizer')
  @ApiOperation({ summary: 'Update a participant by organizer for Secret Sante event' })
  @UseGuards(OrganizerAuthVerifiedGuard)
  @ApiResponse({ type: Participant, status: 200 })
  @ApiResponse({ status: 404, description: 'Participant not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access update Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for update Participant' })
  updateByOrganizer(
    @Param('publicId') publicId: string,
    @Body() updateByOrganizerParticipantDto: UpdateByOrganizerParticipantDto,
  ): Promise<Participant> {
    return this.participantsService.update(publicId, updateByOrganizerParticipantDto);
  }

  @Patch(':publicId')
  @ApiOperation({ summary: 'Update a participant for Secret Sante event' })
  @UseGuards(ParticipantAuthGuard)
  @ApiResponse({ type: Participant, status: 200 })
  @ApiResponse({ status: 404, description: 'Participant not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access update Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for update Participant' })
  update(
    @Param('publicId') publicId: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    return this.participantsService.update(publicId, updateParticipantDto);
  }

  @Delete(':publicId')
  @ApiOperation({ summary: 'Delete a participant for Secret Sante event' })
  @UseGuards(OrganizerAuthVerifiedGuard)
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Participant not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access delete Participant' })
  @ApiResponse({ status: 406, description: 'Has not access for delete Participant' })
  remove(
    @Param('publicId') publicId: string
  ) {
    return this.participantsService.remove(publicId);
  }
}