import prisma from '@prisma/client'
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { IsUUID, IsString, IsNotEmpty, Length, IsBoolean, IsNumber, IsDate } from 'class-validator'

export class SecretSantaEvent implements prisma.SecretSantaEvent {
  @ApiHideProperty()
  id: number

  @ApiProperty({ description: 'The public id of sectret Santa event.', readOnly: true })
  @IsUUID()
  readonly publicId: string

  @ApiProperty({ example: 'Budapest XV somewhere', description: 'The localtion of sectret Santa event.', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  location: string

  @ApiProperty({ example: 2000, description: 'The spend limit for sectret Santa event.', required: true })
  @IsNumber()
  @IsNotEmpty()
  spendLimit: number

  @ApiProperty({ example: '2024-12-16 17:00:00', description: 'The start time of the Secret Santa event.', required: true })
  @IsDate()
  @IsNotEmpty()
  eventBeginAt: Date

  @ApiProperty({ example: true, description: 'Have all participants been admitted to the Secret Santa event?', required: true })
  @IsBoolean()
  settedAllParticipants: boolean

  @ApiProperty({ example: true, description: 'Create time for the Secret Santa event', required: true })
  @IsDate()
  readonly createdAt: Date

  @ApiProperty({ example: true, description: 'Last update time for the Secret Santa event', required: true })
  @IsDate()
  readonly updatedAt: Date

  @ApiProperty({ description: 'The public id of sectret Santa event organizer.', readOnly: true })
  @IsUUID()
  readonly organizerPublicId: string
}