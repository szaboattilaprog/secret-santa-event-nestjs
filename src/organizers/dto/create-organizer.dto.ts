import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, Length } from 'class-validator'

export class CreateOrganizerDto {
  @ApiProperty({ example: 'name', description: 'The name of sectret Santa event organizer', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string

  @ApiProperty({ example: 'email', description: 'The email of secret Santa event organizer', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  email: string
}