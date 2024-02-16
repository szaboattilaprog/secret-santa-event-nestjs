import prisma from '@prisma/client'
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { IsUUID, IsString, IsNotEmpty, Length, IsOptional, IsDate } from 'class-validator'

export class GiftWishlist implements prisma.GiftWishlist {
  @ApiHideProperty()
  id: number

  @ApiProperty({ description: 'The public id of gift wishlist', readOnly: true })
  @IsUUID()
  readonly publicId: string

  @ApiProperty({ example: 'Rolex watch', description: 'The name of gift wish', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string

  @ApiProperty({ example: 'image from your wish', description: 'An image from the wish', required: false })
  @IsString()
  @IsOptional()
  image: string

  @ApiProperty({ example: 'https://www.rolex.com/', description: 'The url of the wish', required: false })
  @IsString()
  @IsOptional()
  gitfUrl: string

  @ApiProperty({ example: '2024-02-10 10:20:30', description: 'The create time of gift wish', required: true })
  @IsDate()
  readonly createdAt: Date

  @ApiProperty({ example: '2024-02-10 10:20:30', description: 'The last update time of gift wish', required: true })
  @IsDate()
  readonly updatedAt: Date

  @ApiProperty({ description: 'The public id of the participant', readOnly: true })
  @IsUUID()
  participantPublicId: string

  @ApiProperty({ description: 'The public id of the secret Santa event', readOnly: true })
  @IsUUID()
  eventPublicId: string
}