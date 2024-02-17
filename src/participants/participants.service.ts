import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateParticipantDto } from '@/src/participants/dto/create-participant.dto';
import { UpdateByOrganizerParticipantDto } from '@/src/participants/dto/update-by-organizer-participant.dto';
import { UpdateParticipantDto } from '@/src/participants/dto/update-participant.dto';
import { FindAllParticipantDto } from '@/src/participants/dto/find-all-participant.dto';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';
import { Participant } from '@/src/participants/entities/participant.entity';

@Injectable()
export class ParticipantsService {
  private readonly logger = new Logger(ParticipantsService.name);
  constructor(
    private participantsRepository: ParticipantsRepository,
  ) {
  }

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    let paricipant: Participant | null = null;
    try {
      paricipant = await this.participantsRepository.create(createParticipantDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          this.logger.error('The Participant already exists', error)
          throw new BadRequestException('The Participant already exists', { cause: createParticipantDto.email });
        }
      }

      this.logger.error(error, 'Error creating Participant');
      throw new BadRequestException('Error creating Participant');
    }

    if (!paricipant) {
      throw new BadRequestException('Error creating Participant');
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

  async update(publicId: string, updateParticipantDto: UpdateParticipantDto | UpdateByOrganizerParticipantDto): Promise<Participant> {
    const paricipant = await this.participantsRepository.update(publicId, updateParticipantDto);
    if (!paricipant) {
      throw new NotFoundException('Participant not found by public id');
    }

    delete paricipant.id;

    return paricipant;
  }

  async remove(publicId: string) {
    const paricipant = await this.participantsRepository.findOne(publicId);
    if (!paricipant) {
      throw new NotFoundException('Participant not found by public id');
    }
    
    this.participantsRepository.remove(publicId);
  }
}