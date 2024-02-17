import { PartialType } from '@nestjs/swagger';
import { CreateOrganizerDto } from '@/src/organizers/dto/create-organizer.dto';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { IsOptional, IsNumber } from 'class-validator'

export class UpdateOrganizerDto extends PartialType(CreateOrganizerDto) {
  @ApiProperty({ example: 123456, description: 'The OTP verification number', required: false })
  @IsOptional()
  @IsNumber()
  otp?: number
}