import { PartialType } from '@nestjs/swagger';
import { CreateParticipantDto } from '@/src/participants/dto/create-participant.dto';

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {}
