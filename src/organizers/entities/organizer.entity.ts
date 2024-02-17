import prisma from '@prisma/client'
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { IsUUID, IsString, IsNotEmpty, Length, IsDate } from 'class-validator'

export class Organizer implements prisma.Organizer {
  @ApiHideProperty()
  id: number

  @ApiProperty({ description: 'The public id of sectret Santa event organizer', readOnly: true })
  @IsUUID()
  readonly publicId: string

  @ApiHideProperty()
  otpVerified: boolean;

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

  @ApiProperty({ description: 'The create datetime of sectret Santa event organizer', readOnly: true })
  @IsDate()
  readonly createdAt: Date

  @ApiProperty({ description: 'The last update datetime of sectret Santa event organizer', readOnly: true })
  @IsDate()
  readonly updatedAt: Date
}