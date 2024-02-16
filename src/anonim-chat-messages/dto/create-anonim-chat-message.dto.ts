import { ApiProperty } from '@nestjs/swagger'
import { IsUUID, IsString, IsNotEmpty, Length, } from 'class-validator'

export class CreateAnonimChatMessageDto {
  @ApiProperty({ example: 'Hello, how are you?', description: 'The message', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  message: string

  @ApiProperty({ description: 'The public id of the anonim chat', required: true })
  @IsUUID()
  chatPublicId: string

  @ApiProperty({ description: 'The public id of the participant', required: true })
  @IsUUID()
  participantPublicId: string
}