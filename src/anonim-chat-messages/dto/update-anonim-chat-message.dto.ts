import { PartialType } from '@nestjs/mapped-types';
import { CreateAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/create-anonim-chat-message.dto';

export class UpdateAnonimChatMessageDto extends PartialType(
  CreateAnonimChatMessageDto,
) {
  id: number;
}
