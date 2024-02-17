import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  NotAcceptableException
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnonimChatsService } from '@/src/anonim-chats/anonim-chats.service';
import { CreateAnonimChatDto } from '@/src/anonim-chats/dto/create-anonim-chat.dto';
import { UpdateAnonimChatDto } from '@/src/anonim-chats/dto/update-anonim-chat.dto';
import { AnonimChat } from './entities/anonim-chat.entity';
import { Auth } from '@/src/auth/auth-decorator/auth.decorator';
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';
import { ParticipantAuthGuard } from '@/src/auth/participant-auth-guard/participant-auth.guard';

@ApiTags('Anonim Chats')
@ApiBearerAuth()
@UseGuards(ParticipantAuthGuard)
@Controller('anonim-chats')
export class AnonimChatsController {
  constructor(private readonly anonimChatsService: AnonimChatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an anonimChat' })
  @ApiResponse({ type: AnonimChat, status: 201 })
  @ApiResponse({ status: 400, description: 'Error creating AnonimChat' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access create Anonim Chat' })
  @ApiResponse({ status: 406, description: 'Has not access for create Anonim Chat' })
  create(
    @Body() createAnonimChatDto: CreateAnonimChatDto): Promise<AnonimChat> {
    return this.anonimChatsService.create(createAnonimChatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all anonimChats for paricipant of Secret Sante event' })
  @ApiResponse({ type: [AnonimChat], status: 200 })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Anonim Chat' })
  @ApiResponse({ status: 406, description: 'Has not access for Anonim Chat' })
  findAll(
    @Auth() auth: AccessAuth,
  ): Promise<AnonimChat[]> {
    return this.anonimChatsService.findAll(auth.publicId);
  }

  @Get(':publicId')
  @ApiOperation({ summary: 'Get an anonimChat for paricipant of Secret Sante event' })
  @ApiResponse({ type: AnonimChat, status: 200 })
  @ApiResponse({ status: 404, description: 'Anonim Chat not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Anonim Chat' })
  @ApiResponse({ status: 406, description: 'Has not access for Anonim Chat' })
  async findOne(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string
  ): Promise<AnonimChat> {
    const anonimChat = await this.anonimChatsService.findOne(publicId);
    if (anonimChat.participantPublicId !== auth.publicId) {
      throw new NotAcceptableException('Has not access for Anonim Chat');
    }

    return anonimChat;
  }

  @Patch(':publicId')
  @ApiOperation({ summary: 'Update an anonimChat' })
  @ApiResponse({ type: AnonimChat, status: 200 })
  @ApiResponse({ status: 404, description: 'Anonim Chat not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access Anonim Chat' })
  @ApiResponse({ status: 406, description: 'Has not access for Anonim Chat' })
  update(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string,
    @Body() updateAnonimChatDto: UpdateAnonimChatDto,
  ): Promise<AnonimChat> {
    return this.anonimChatsService.update(auth.publicId, publicId, updateAnonimChatDto);
  }
}