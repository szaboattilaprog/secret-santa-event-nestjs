import { Injectable, Logger } from '@nestjs/common';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { CreateParticipantDto } from '@/src/participants/dto/create-participant.dto';
import { FindAllParticipantDto } from '@/src/participants/dto/find-all-participant.dto';
import { UpdateByOrganizerParticipantDto } from '@/src/participants/dto/update-by-organizer-participant.dto';
import { UpdateParticipantDto } from '@/src/participants/dto/update-participant.dto';
import { Participant } from '@/src/participants/entities/participant.entity';

@Injectable()
export class ParticipantsRepository {
  private readonly logger = new Logger(ParticipantsRepository.name);

  constructor(
    private readonly postgresqlPrismaService: PostgresqlPrismaService,
  ) {}
  
  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    this.logger.log(`Creating participant`);
    return this.postgresqlPrismaService.participant.create({
      data: {
        ...createParticipantDto,
      },
    });
  }

  async findAll(findAllParticipantDto: FindAllParticipantDto): Promise<Participant[]> {
    this.logger.log(`Finding all participants`);
    return this.postgresqlPrismaService.participant.findMany({
      where: {
        eventPublicId: findAllParticipantDto.eventPublicId,
      },
      include: {
        getFromParticipant: {
          select: {
            name: true,
            email: true,
          },
        },
        givesToParticipant: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(publicId: string): Promise<Participant> {
    this.logger.log(`Finding participant with publicId: ${publicId}`);
    return this.postgresqlPrismaService.participant.findUnique({
      where: {
        publicId,
      },
      include: {
        event: {
          select:{
            location: true,
            spendLimit: true,
            eventBeginAt: true,
          }
        },
        giftWishlists: {
          select: {
            name: true,
            image: true,
            giftUrl: true,
          },
        },
        getFromParticipant: {
          select: {
            name: true,
            email: true,
            giftWishlists: {
              select: {
                name: true,
                image: true,
                giftUrl: true,
              },
            },
          },
        },
        givesToParticipant: {
          select: {
            name: true,
            email: true,
            giftWishlists: {
              select: {
                name: true,
                image: true,
                giftUrl: true,
              },
            },
          },
        },
      },
    });
  }

  async update(publicId: string, updateParticipantDto: UpdateParticipantDto & UpdateByOrganizerParticipantDto & { getFromParticipantPublicId?: string, givesToParticipantPublicId?: string }): Promise<Participant> {
    this.logger.log(`Updating participant with publicId: ${publicId}`);
    return this.postgresqlPrismaService.participant.update({
      where: {
        publicId,
      },
      data: {
        ...updateParticipantDto,
      },
      include: {
        getFromParticipant: {
          select: {
            name: true,
            email: true,
          },
        },
        givesToParticipant: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async updatePairs(participants: Participant[]) {
    this.logger.log(`Updating participants`);
    participants.forEach(participant => {
      const { publicId, getFromParticipantPublicId, givesToParticipantPublicId } = participant;
      this.update(publicId, { getFromParticipantPublicId, givesToParticipantPublicId });
    });
  }

  async remove(publicId: string) {
    this.logger.log(`Removing participant with publicId: ${publicId}`);
    this.postgresqlPrismaService.participant.delete({
      where: {
        publicId,
      },
    });
  }
}