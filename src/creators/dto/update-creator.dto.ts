import { PartialType } from '@nestjs/swagger';
import { CreateCreatorDto } from '@/src/creators/dto/create-creator.dto';

export class UpdateCreatorDto extends PartialType(CreateCreatorDto) {}