import prisma from '@prisma/client'
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { IsUUID, IsString, IsNotEmpty, Length, IsDate } from 'class-validator'

export class AnonimChatMessage implements prisma.AnonimChatMessage {
  @ApiHideProperty()
  id: number

  @ApiProperty({ description: 'The public id of anonim chat message', readOnly: true })
  @IsUUID()
  readonly publicId: string

  @ApiProperty({ example: 'Hello, how are you?', description: 'The message', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  message: string

  @ApiProperty({ description: 'The public id of the anonim chat', readOnly: true })
  @IsUUID()
  chatPublicId: string

  @ApiProperty({ description: 'The public id of the participant', readOnly: true })
  @IsUUID()
  participantPublicId: string

  @ApiProperty({ example: '2024-02-10 10:20:30', description: 'The create time of anonim chat message', required: true })
  @IsDate()
  readonly createdAt: Date

  @ApiProperty({ example: '2024-02-10 10:20:30', description: 'The last update time of anonim chat message', required: true })
  @IsDate()
  readonly updatedAt: Date
}