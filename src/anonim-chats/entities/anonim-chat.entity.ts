import prisma from '@prisma/client'
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { IsUUID, IsString, IsNotEmpty, Length, IsDate } from 'class-validator'

export class AnonimChat implements prisma.AnonimChat {
  @ApiHideProperty()
  id: number

  @ApiProperty({ description: 'The public id of anonim chat', readOnly: true })
  @IsUUID()
  readonly publicId: string

  @ApiProperty({ example: 'Hello, how are you?', description: 'The message', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  topic: string

  @ApiProperty({ description: 'The public id of the organizer participant', readOnly: true })
  readonly participantPublicId: string

  @ApiProperty({ description: 'The public id of the Secret Santa Event', readOnly: true })
  readonly eventPublicId: string

  @ApiProperty({ example: '2024-02-10 10:20:30', description: 'The create time of anonim chat', required: true })
  @IsDate()
  readonly createdAt: Date

  @ApiProperty({ example: '2024-02-10 10:20:30', description: 'The last update time of anonim chat', required: true })
  @IsDate()
  readonly updatedAt: Date
}