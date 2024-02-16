import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateSecretSantaEventDto } from '@/src/secret-santa-events/dto/create-secret-santa-event.dto';

export class UpdateSecretSantaEventDto extends PartialType(
  CreateSecretSantaEventDto,
) {
  @ApiProperty({ example: true, description: 'Have all participants been admitted to the Secret Santa event?', required: false })
  @IsOptional()
  @IsBoolean()
  settedAllParticipants: boolean
}