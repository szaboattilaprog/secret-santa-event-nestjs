import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from '@/src/participants/dto/create-participant.dto';
import { UpdateByCreatorParticipantDto } from '@/src/participants/dto/update-by-creator-participant.dto';
import { UpdateParticipantDto } from '@/src/participants/dto/update-participant.dto';
import { FindAllParticipantDto } from '@/src/participants/dto/find-all-participant.dto';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';
import { Participant } from '@/src/participants/entities/participant.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    private participantsRepository: ParticipantsRepository,
  ) {
  }

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    const paricipant = await this.participantsRepository.create(createParticipantDto);
    if (!paricipant) {
      throw new NotFoundException('Participant not created');
    }

    delete paricipant.id;

    return paricipant;
  }

  async findAll(findAllParticipantDto: FindAllParticipantDto): Promise<Participant[]> {
    const paricipants = await this.participantsRepository.findAll(findAllParticipantDto);

    return paricipants.map((paricipant) => {
      delete paricipant.id;
      return paricipant;
    });
  }

  async findOne(publicId: string): Promise<Participant> {
    const paricipant = await this.participantsRepository.findOne(publicId);
    if (!paricipant) {
      throw new NotFoundException('Participant not found by public id');
    }

    delete paricipant.id;

    return paricipant;
  }

  async update(publicId: string, updateParticipantDto: UpdateParticipantDto | UpdateByCreatorParticipantDto): Promise<Participant> {
    const paricipant = await this.participantsRepository.update(publicId, updateParticipantDto);
    if (!paricipant) {
      throw new NotFoundException('Participant not found by public id');
    }

    delete paricipant.id;

    return paricipant;
  }

  async remove(publicId: string) {
    this.participantsRepository.remove(publicId);
  }
}