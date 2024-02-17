import { ApiProperty } from '@nestjs/swagger'
import { IsUUID, IsString, IsNotEmpty, Length } from 'class-validator'

export class CreateAnonimChatDto {
  @ApiProperty({ example: 'Hello, how are you?', description: 'The message', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  topic: string

  @ApiProperty({ description: 'The public id of the organizer participant', required: true })
  @IsUUID()
  participantPublicId: string

  @ApiProperty({ description: 'The public id of the Secret Santa Event', required: true })
  @IsUUID()
  eventPublicId: string
}