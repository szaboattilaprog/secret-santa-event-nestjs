import { Injectable } from '@nestjs/common';
import { CreateCreatorDto } from '@/src/creators/dto/create-creator.dto';
import { UpdateCreatorDto } from '@/src/creators/dto/update-creator.dto';

@Injectable()
export class CreatorsService {
  create(createCreatorDto: CreateCreatorDto) {
    return 'This action adds a new creator';
  }

  findAll() {
    return `This action returns all creators`;
  }

  findOne(id: number) {
    return `This action returns a #${id} creator`;
  }

  update(id: number, updateCreatorDto: UpdateCreatorDto) {
    return `This action updates a #${id} creator`;
  }

  remove(id: number) {
    return `This action removes a #${id} creator`;
  }
}
