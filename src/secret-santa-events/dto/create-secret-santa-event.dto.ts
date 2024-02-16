import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, Length, IsNumber, IsDate } from 'class-validator'

export class CreateSecretSantaEventDto {
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