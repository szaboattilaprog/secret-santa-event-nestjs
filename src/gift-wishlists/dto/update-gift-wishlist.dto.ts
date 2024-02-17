import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsOptional } from 'class-validator'

export class UpdateGiftWishlistDto {
  @ApiProperty({ example: 'Rolex watch', description: 'The name of gift wish', required: false })
  @IsString()
  @IsOptional()
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