import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, Length } from 'class-validator'

export class UpdateAnonimChatDto {
  @ApiProperty({ example: 'Hello, how are you?', description: 'The message', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  topic: string
}