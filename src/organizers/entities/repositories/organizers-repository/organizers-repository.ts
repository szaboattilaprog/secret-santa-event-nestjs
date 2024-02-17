import { Injectable, Logger } from '@nestjs/common';
import { Organizer } from '@prisma/client';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { CreateOrganizerDto } from '@/src/organizers/dto/create-organizer.dto';
import { UpdateOrganizerDto } from '@/src/organizers/dto/update-organizer.dto';

@Injectable()
export class OrganizersRepository {
  private readonly logger = new Logger(OrganizersRepository.name);

  constructor(
    private readonly postgresqlPrismaService: PostgresqlPrismaService,
  ) {}
  
  async create(createOrganizerDto: CreateOrganizerDto): Promise<Organizer> {
    return this.postgresqlPrismaService.organizer.create({
      data: createOrganizerDto,
    });
  }

  async update(publicId: string, updateOrganizerDto: UpdateOrganizerDto & { otpVerified?: boolean }): Promise<Organizer|null> {
    return this.postgresqlPrismaService.organizer.update({
      where: {
        publicId,
      },
      data: updateOrganizerDto,
    });
  }

  async findOne(publicId: string): Promise<Organizer|null> {
    return this.postgresqlPrismaService.organizer.findUnique({
      where: {
        publicId,
      },
    });
  }

  async findOneByEmail(email: string): Promise<Organizer|null> {
    return this.postgresqlPrismaService.organizer.findUnique({
      where: {
        email,
      },
    });
  }
}