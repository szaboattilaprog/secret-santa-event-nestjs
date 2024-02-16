import { Injectable, Logger } from '@nestjs/common';
import { Creator } from '@prisma/client';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { CreateCreatorDto } from '@/src/creators/dto/create-creator.dto';
import { UpdateCreatorDto } from '@/src/creators/dto/update-creator.dto';

@Injectable()
export class CreatorsRepository {
  private readonly logger = new Logger(CreatorsRepository.name);

  constructor(
    private readonly postgresqlPrismaService: PostgresqlPrismaService,
  ) {}
  
  async createOrGetExists(createCreatorDto: CreateCreatorDto): Promise<Creator> {
    const creator = await this.postgresqlPrismaService.creator.findUnique({
      where: {
        email: createCreatorDto.email,
      },
    });

    if (creator) {
      this.logger.log(`Creator with email ${createCreatorDto.email} already exists`);
      return creator;
    }

    return this.postgresqlPrismaService.creator.create({
      data: createCreatorDto,
    });
  }

  async update(publicId: string, updateCreatorDto: UpdateCreatorDto): Promise<Creator|null> {
    return this.postgresqlPrismaService.creator.update({
      where: {
        publicId,
      },
      data: updateCreatorDto,
    });
  }

  async findOne(publicId: string): Promise<Creator|null> {
    return this.postgresqlPrismaService.creator.findUnique({
      where: {
        publicId,
      },
    });
  }
}