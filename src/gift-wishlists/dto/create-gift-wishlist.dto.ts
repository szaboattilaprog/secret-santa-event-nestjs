import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, Length, IsOptional, IsUUID } from 'class-validator'

export class CreateGiftWishlistDto {
  @ApiProperty({ example: 'Rolex watch', description: 'The name of gift wish', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string

  @ApiProperty({ example: 'image from your wish', description: 'An image from the wish', required: false })
  @IsString()
  @IsOptional()
  image?: string

  @ApiProperty({ example: 'https://www.rolex.com/', description: 'The url of the wish', required: false })
  @IsString()
  @IsOptional()
  giftUrl?: string

  @ApiProperty({ description: 'The public id of the participant', readOnly: true })
  @IsUUID()
  participantPublicId: string

  @ApiProperty({ description: 'The public id of the secret Santa event', readOnly: true })
  @IsUUID()
  eventPublicId: string
}