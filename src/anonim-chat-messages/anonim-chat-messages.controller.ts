import {
  Body,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FindAllAnonimChatMessageDto } from '@/src/anonim-chat-messages/dto/find-all-anonim-chat-message.dto';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';
import { AnonimChatMessage } from '@/src/anonim-chat-messages/entities/anonim-chat-message.entity';
import { PartcipantAuthGuard } from '@/src/auth/partcipant-auth/partcipant-auth.guard';

@ApiTags('Anonim Chat Messages')
@ApiBearerAuth()
@UseGuards(PartcipantAuthGuard)
@Controller('anonim-chat-messages')
export class AnonimChatMessagesController {
  constructor(private readonly anonimChatMessagesService: AnonimChatMessagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all anonimChat messages for paricipant of Secret Sante event' })
  @ApiResponse({ type: [AnonimChatMessage], status: 200 })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Anonim Chat Messages' })
  @ApiResponse({ status: 406, description: 'Has not access for Anonim Chat Messages' })
  findAll(
    @Body() findAllAnonimChatMessageDto: FindAllAnonimChatMessageDto
  ): Promise<AnonimChatMessage[]> {
    return this.anonimChatMessagesService.findAll(findAllAnonimChatMessageDto);
  }
}