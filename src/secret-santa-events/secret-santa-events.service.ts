import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SecretSantaEvent } from '@prisma/client';
import { CreateSecretSantaEventDto } from '@/src/secret-santa-events/dto/create-secret-santa-event.dto';
import { UpdateSecretSantaEventDto } from '@/src/secret-santa-events/dto/update-secret-santa-event.dto';
import { SecretSantaEventsRepository } from '@/src/secret-santa-events/entities/repositories/secret-santa-events-repository/secret-santa-events-repository';

@Injectable()
export class SecretSantaEventsService {
  constructor(
    private secretSantaEventsRepository: SecretSantaEventsRepository,
    private eventEmitter: EventEmitter2
  ) {
  }

  async create(organizerPublicId: string, createSecretSantaEventDto: CreateSecretSantaEventDto): Promise<SecretSantaEvent> {
    const secretSantaEvent = await this.secretSantaEventsRepository.create(organizerPublicId, createSecretSantaEventDto);
    delete secretSantaEvent.id;

    return secretSantaEvent;
  }

  async findAll(organizerPublicId: string): Promise<SecretSantaEvent[]> {
    const secretSantaEvents = await this.secretSantaEventsRepository.findAll(organizerPublicId);

    return secretSantaEvents.map(secretSantaEvent => {
      delete secretSantaEvent.id;
      return secretSantaEvent;
    });
  }

  async findOne(publicId: string): Promise<SecretSantaEvent> {
    const secretSantaEvent = await this.secretSantaEventsRepository.findOne(publicId);

    if (!secretSantaEvent) {
      throw new NotFoundException('Secret Santa event not found');
    }
    delete secretSantaEvent.id;

    return secretSantaEvent;
  }

  async update(organizerPublicId: string, publicId: string, updateSecretSantaEventDto: UpdateSecretSantaEventDto): Promise<SecretSantaEvent> {
    const secretSantaEvent = await this.secretSantaEventsRepository.update(organizerPublicId, publicId, updateSecretSantaEventDto);

    if (!secretSantaEvent) {
      throw new NotFoundException('Secret Santa event not found');
    }
    delete secretSantaEvent.id;

    if (secretSantaEvent.settedAllParticipants && secretSantaEvent.participants.length >= 4 && secretSantaEvent.participants.length % 2 === 0) {
      this.eventEmitter.emit('SettedAllParticipants', secretSantaEvent.publicId);
    }

    if (secretSantaEvent.settedAllParticipants && (secretSantaEvent.participants.length < 4 || secretSantaEvent.participants.length % 2 !== 0)) {
      secretSantaEvent.settedAllParticipants = false;
      await this.secretSantaEventsRepository.update(organizerPublicId, publicId, { settedAllParticipants: false });
      throw new BadRequestException('Participants must be at least 4 and must be even number of elements when setted all participants');
    }

    return secretSantaEvent;
  }

  async remove(organizerPublicId: string, publicId: string) {
    const secretSantaEvent = await this.secretSantaEventsRepository.findOne(publicId);
    if (!secretSantaEvent) {
      throw new NotFoundException('Secret Santa event not found');
    }

    this.secretSantaEventsRepository.remove(organizerPublicId, publicId);
  }
}