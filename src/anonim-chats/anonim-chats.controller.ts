import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnonimChatsService } from '@/src/anonim-chats/anonim-chats.service';
import { CreateAnonimChatDto } from '@/src/anonim-chats/dto/create-anonim-chat.dto';
import { UpdateAnonimChatDto } from '@/src/anonim-chats/dto/update-anonim-chat.dto';

@Controller('anonim-chats')
export class AnonimChatsController {
  constructor(private readonly anonimChatsService: AnonimChatsService) {}

  @Post()
  create(@Body() createAnonimChatDto: CreateAnonimChatDto) {
    return this.anonimChatsService.create(createAnonimChatDto);
  }

  @Get()
  findAll() {
    return this.anonimChatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anonimChatsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnonimChatDto: UpdateAnonimChatDto,
  ) {
    return this.anonimChatsService.update(+id, updateAnonimChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anonimChatsService.remove(+id);
  }
}
