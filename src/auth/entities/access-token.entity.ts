import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsJWT } from 'class-validator'

export class AccessToken {
  @ApiProperty({ example: 'accessToken', description: 'The JWT access token', required: true })
  @IsJWT()
  @IsNotEmpty()
  accessToken: string;
}