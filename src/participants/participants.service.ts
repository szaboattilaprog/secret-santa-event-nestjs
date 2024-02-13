import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from '@/src/participants/dto/create-participant.dto';
import { UpdateParticipantDto } from '@/src/participants/dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  create(createParticipantDto: CreateParticipantDto) {
    return 'This action adds a new participant';
  }

  findAll() {
    return `This action returns all participants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} participant`;
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return `This action updates a #${id} participant`;
  }

  remove(id: number) {
    return `This action removes a #${id} participant`;
  }
}
