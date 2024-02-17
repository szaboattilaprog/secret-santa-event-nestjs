import prisma from '@prisma/client'
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { IsUUID, IsString, IsNotEmpty, Length, IsEmail, IsDate, IsOptional, ValidateNested, IsNumber } from 'class-validator'
import { Type } from 'class-transformer';

class NestedSecretSantaEvent {
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
}

class NestedGiftWishlist {
  @ApiProperty({ example: 'Rolex watch', description: 'The name of gift wish', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name?: string

  @ApiProperty({ example: 'image from your wish', description: 'An image from the wish', required: false })
  @IsString()
  @IsOptional()
  image?: string

  @ApiProperty({ example: 'https://www.rolex.com/', description: 'The url of the wish', required: false })
  @IsString()
  @IsOptional()
  giftUrl?: string
}

class NestedParticipant {
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
}

export class Participant implements prisma.Participant {
  @ApiHideProperty()
  id: number

  @ApiProperty({ description: 'The public id of participant.', readOnly: true })
  @IsUUID()
  @IsNotEmpty()
  @Length(36, 36)
  readonly publicId: string

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

  @ApiProperty({ example: '2024-12-16 17:00:00', description: 'The time when the participant sends the gift.', required: false })
  @IsDate()
  @IsOptional()
  sendGiftAt: Date

  @ApiProperty({ example: '2024-12-16 17:00:00', description: 'The time when the participant receives the gift.', required: false })
  @IsDate()
  @IsOptional()
  receiveGiftAt: Date

  @ApiProperty({ description: 'The public id of sectret Santa event.', required: true })
  @IsUUID()
  @IsNotEmpty()
  @Length(36, 36)
  readonly eventPublicId: string

  @ApiProperty({ description: 'The public ID of the participant of the secret Santa event to whom gives a gift.', required: false })
  @IsUUID()
  @IsOptional()
  @Length(36, 36)
  givesToParticipantPublicId: string

  @ValidateNested()
  @Type(() => NestedParticipant)
  givesToParticipant?: NestedParticipant

  @ApiProperty({ description: 'The public ID of the secret Santa event participant from whom will receive a gift.', required: false })
  @IsUUID()
  @IsOptional()
  @Length(36, 36)
  getFromParticipantPublicId: string

  @ValidateNested()
  @Type(() => NestedParticipant)
  getFromParticipant?: NestedParticipant

  @ValidateNested()
  @Type(() => NestedSecretSantaEvent)
  event?: NestedSecretSantaEvent

  @ValidateNested()
  @Type(() => NestedGiftWishlist)
  giftWishlist?: NestedGiftWishlist

  @ApiProperty({ example: true, description: 'Create time for the Secret Santa event', required: true })
  @IsDate()
  readonly createdAt: Date

  @ApiProperty({ example: true, description: 'Create time for the Secret Santa event', required: true })
  @IsDate()
  readonly updatedAt: Date
}