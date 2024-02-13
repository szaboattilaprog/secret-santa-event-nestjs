import { PartialType } from '@nestjs/swagger';
import { CreateAnonimChatDto } from '@/src/anonim-chats/dto/create-anonim-chat.dto';

export class UpdateAnonimChatDto extends PartialType(CreateAnonimChatDto) {}
