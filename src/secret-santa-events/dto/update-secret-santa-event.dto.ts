import { PartialType } from '@nestjs/swagger';
import { CreateSecretSantaEventDto } from '@/src/secret-santa-events/dto/create-secret-santa-event.dto';

export class UpdateSecretSantaEventDto extends PartialType(
  CreateSecretSantaEventDto,
) {}
