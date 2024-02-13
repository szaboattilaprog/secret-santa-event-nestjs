import { Injectable } from '@nestjs/common';
import { CreateSecretSantaEventDto } from '@/src/secret-santa-events/dto/create-secret-santa-event.dto';
import { UpdateSecretSantaEventDto } from '@/src/secret-santa-events/dto/update-secret-santa-event.dto';

@Injectable()
export class SecretSantaEventsService {
  create(createSecretSantaEventDto: CreateSecretSantaEventDto) {
    return 'This action adds a new secretSantaEvent';
  }

  findAll() {
    return `This action returns all secretSantaEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} secretSantaEvent`;
  }

  update(id: number, updateSecretSantaEventDto: UpdateSecretSantaEventDto) {
    return `This action updates a #${id} secretSantaEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} secretSantaEvent`;
  }
}
