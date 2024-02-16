import { Injectable, Logger } from '@nestjs/common';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { SecretSantaEvent } from '@prisma/client';
import { CreateSecretSantaEventDto } from '@/src/secret-santa-events/dto/create-secret-santa-event.dto';
import { UpdateSecretSantaEventDto } from '@/src/secret-santa-events/dto/update-secret-santa-event.dto';
import { Participant } from '@/src/participants/entities/participant.entity';

@Injectable()
export class SecretSantaEventsRepository {
  private readonly logger = new Logger(SecretSantaEventsRepository.name);

  constructor(
    private readonly postgresqlPrismaService: PostgresqlPrismaService,
  ) {}

  async create(creatorPublicId: string, createSecretSantaEventDto: CreateSecretSantaEventDto): Promise<SecretSantaEvent> {
    return this.postgresqlPrismaService.secretSantaEvent.create({
      data: {
        ...createSecretSantaEventDto,
        creator: {
          connect: { publicId: creatorPublicId }
        }
      }
    });
  }

  async getParticipants(publicId: string): Promise<Participant[]> {
    const secretSantaEvent = await this.postgresqlPrismaService.secretSantaEvent.findFirst({
      where: {
        publicId
      },
      select: {
        participants: {
          include: {
            givesToParticipant: {
              select: {
                email: true,
                name: true,
              }
            },
            getFromParticipant: {
              select: {
                email: true,
                name: true,
              }
            }
          }
        }
      }
    });

    return secretSantaEvent.participants;
  }

  async findAll(creatorPublicId: string): Promise<SecretSantaEvent[]> {
    return this.postgresqlPrismaService.secretSantaEvent.findMany({
      where: {
        creatorPublicId
      }
    });
  }

  async findOne(publicId: string): Promise<SecretSantaEvent & { creator: { email: string, name: string } }> {
    return this.postgresqlPrismaService.secretSantaEvent.findFirst({
      where: {
        publicId
      },
      include: {
        creator: {
          select: {
            email: true,
            name: true,
          }
        }
      }
    });
  }

  async update(creatorPublicId: string, publicId: string, updateSecretSantaEventDto: UpdateSecretSantaEventDto): Promise<SecretSantaEvent & { participants: Participant[] }> {
    return this.postgresqlPrismaService.secretSantaEvent.update({
      where: {
        publicId,
        creatorPublicId
      },
      data: updateSecretSantaEventDto,
      include: {
        participants: true
      }
    });
  }

  async remove(creatorPublicId: string, publicId: string) {
    this.postgresqlPrismaService.secretSantaEvent.delete({
      where: {
        publicId,
        creatorPublicId
      }
    });
  }
}