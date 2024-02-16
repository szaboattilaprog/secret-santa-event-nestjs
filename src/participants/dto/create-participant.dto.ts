import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, Length, IsEmail, IsUUID } from 'class-validator'

export class CreateParticipantDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of participant.', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string

  @ApiProperty({ example: 'xyz@xyz.xyz', description: 'The email of participant.', required: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ description: 'The public id of sectret Santa event.', required: true })
  @IsUUID()
  @IsNotEmpty()
  @Length(36, 36)
  eventPublicId: string
}