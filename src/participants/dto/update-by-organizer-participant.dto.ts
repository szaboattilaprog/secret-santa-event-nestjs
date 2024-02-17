import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsEmail, IsOptional } from 'class-validator'

export class UpdateByOrganizerParticipantDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of participant.', required: false })
  @IsString()
  @IsOptional()
  @Length(1, 255)
  name: string

  @ApiProperty({ example: 'xyz@xyz.xyz', description: 'The email of participant.', required: false })
  @IsString()
  @IsOptional()
  @IsEmail()
  email: string
}