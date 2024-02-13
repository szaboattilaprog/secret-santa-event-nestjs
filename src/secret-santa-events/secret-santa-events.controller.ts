import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SecretSantaEventsService } from '@/src/secret-santa-events/secret-santa-events.service';
import { CreateSecretSantaEventDto } from '@/src/secret-santa-events/dto/create-secret-santa-event.dto';
import { UpdateSecretSantaEventDto } from '@/src/secret-santa-events/dto/update-secret-santa-event.dto';

@Controller('secret-santa-events')
export class SecretSantaEventsController {
  constructor(
    private readonly secretSantaEventsService: SecretSantaEventsService,
  ) {}

  @Post()
  create(@Body() createSecretSantaEventDto: CreateSecretSantaEventDto) {
    return this.secretSantaEventsService.create(createSecretSantaEventDto);
  }

  @Get()
  findAll() {
    return this.secretSantaEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.secretSantaEventsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSecretSantaEventDto: UpdateSecretSantaEventDto,
  ) {
    return this.secretSantaEventsService.update(+id, updateSecretSantaEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secretSantaEventsService.remove(+id);
  }
}
