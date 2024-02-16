import { Injectable, NotFoundException } from '@nestjs/common';
import { Creator } from '@prisma/client';
import { CreateCreatorDto } from '@/src/creators/dto/create-creator.dto';
import { UpdateCreatorDto } from '@/src/creators/dto/update-creator.dto';
import { CreatorsRepository } from '@/src/creators/entities/repositories/creators-repository/creators-repository';

@Injectable()
export class CreatorsService {
  constructor(private creatorsRepository: CreatorsRepository) {}

  async create(createCreatorDto: CreateCreatorDto): Promise<Creator> {
    return this.creatorsRepository.createOrGetExists(createCreatorDto);
  }

  async findOne(publicId: string): Promise<Creator> {
    const creator = await this.creatorsRepository.findOne(publicId);
    if (!creator) {
      throw new NotFoundException('Creator not found');
    }

    delete creator.id;

    return creator;
  }

  async update(publicId: string, updateCreatorDto: UpdateCreatorDto): Promise<Creator> {
    const creator = await this.creatorsRepository.update(publicId, updateCreatorDto);
    if (!creator) {
      throw new NotFoundException('Creator not found');
    }

    delete creator.id;

    return creator;
  }
}