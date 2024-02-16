import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsOptional } from 'class-validator'

export class UpdateParticipantDto {
  @ApiProperty({ example: '2024-12-16 17:00:00', description: 'The time when the participant sends the gift.', required: false })
  @IsDate()
  @IsOptional()
  sendGiftAt: Date

  @ApiProperty({ example: '2024-12-16 17:00:00', description: 'The time when the participant receives the gift.', required: false })
  @IsDate()
  @IsOptional()
  receiveGiftAt: Date
}