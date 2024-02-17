import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';
import { SecretSantaEventsRepository } from '@/src/secret-santa-events/entities/repositories/secret-santa-events-repository/secret-santa-events-repository';
import { AppMailerService } from '@/src/app-mailer/app-mailer.service';
import { Participant } from '@/src/participants/entities/participant.entity';

@Injectable()
export class MakeGiftPairsListener {
  private readonly logger = new Logger(MakeGiftPairsListener.name);
  constructor(
    private readonly participantsRepository: ParticipantsRepository,
    private readonly secretSantaEventsRepository: SecretSantaEventsRepository,
    private appMailerService: AppMailerService
  ) {}

  @OnEvent('SettedAllParticipants')
  async handleSettedAllParticipantsEvent(eventPublicId: string) {
    this.logger.log(`Handling SettedAllParticipants event with eventPublicId: ${eventPublicId}`);
    const secretSantaEvent = await this.secretSantaEventsRepository.findOne(eventPublicId);
    const participants = await this.participantsRepository.findAll({ eventPublicId });
    this.makeRandomPairs(participants);
    for (const participant of participants) {
      this.appMailerService.sendYouArePartcipantMail(participant, secretSantaEvent);
    }
  }

  private makeRandomPairs(participants: Participant[]) {
    const selectedGivesToParticipants: Participant[] = [];
    const selectedGetFromParticipants: Participant[] = [];
    for (const participant of participants) {      
      const stillNotGivesToParticipants = participants.filter(participant => !selectedGivesToParticipants.includes(participant));
      let randomIndex = this.getRandomIndex(stillNotGivesToParticipants.length);
      while (participant.publicId === stillNotGivesToParticipants[randomIndex].publicId) {
        randomIndex = this.getRandomIndex(stillNotGivesToParticipants.length);
      }

      participant.givesToParticipantPublicId = stillNotGivesToParticipants[randomIndex].publicId;
      participant.givesToParticipant = stillNotGivesToParticipants[randomIndex];
      this.logger.log(`participant with publicId: ${participant.publicId} gives to participant with publicId: ${stillNotGivesToParticipants[randomIndex].publicId}`);
      selectedGivesToParticipants.push(stillNotGivesToParticipants[randomIndex]);

      const stillNotGetFromParticipants = participants.filter(participant => !selectedGetFromParticipants.includes(participant));
      randomIndex = this.getRandomIndex(stillNotGetFromParticipants.length);
      while (participant.publicId === stillNotGetFromParticipants[randomIndex].publicId || (participant.givesToParticipantPublicId === stillNotGetFromParticipants[randomIndex].publicId && stillNotGetFromParticipants.length > 1)) {
        randomIndex = this.getRandomIndex(stillNotGetFromParticipants.length);
      }

      participant.getFromParticipantPublicId = stillNotGetFromParticipants[randomIndex].publicId;
      participant.getFromParticipant = stillNotGetFromParticipants[randomIndex];
      this.logger.log(`participant with publicId: ${participant.publicId} gets from participant with publicId: ${stillNotGetFromParticipants[randomIndex].publicId}`);
      selectedGetFromParticipants.push(stillNotGetFromParticipants[randomIndex]);
    }

    if (participants.length === selectedGivesToParticipants.length && participants.length === selectedGetFromParticipants.length) {
      this.logger.log('Updating all participants with random pairs');
      this.participantsRepository.updatePairs(participants);
    } else {
      throw new BadRequestException('Error making random pairs');
    }
  }

  private getRandomIndex(length: number) {
    return Math.floor(Math.random() * length);
  } 
}