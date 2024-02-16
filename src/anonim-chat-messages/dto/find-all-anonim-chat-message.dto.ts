import { ApiProperty } from '@nestjs/swagger'
import { Length, IsNotEmpty, IsUUID } from 'class-validator'

export class FindAllAnonimChatMessageDto {
  @ApiProperty({ description: 'The public id of sectret Santa event.', required: true })
  @IsUUID()
  @IsNotEmpty()
  @Length(36, 36)
  chatPublicId: string
}