import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  NotAcceptableException,
  Logger
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatorsService } from '@/src/creators/creators.service';
import { CreateCreatorDto } from '@/src/creators/dto/create-creator.dto';
import { UpdateCreatorDto } from '@/src/creators/dto/update-creator.dto';
import { Auth } from '@/src/auth/auth/auth.decorator';
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';
import { Public } from '@/src/auth/public/public.decorator';
import { Creator } from '@/src/creators/entities/creator.entity';
import { CreatorAuthGuard } from '@/src/auth/creator-auth/creator-auth.guard';

@ApiTags('Creators')
@Controller('creators')
export class CreatorsController {
  private readonly logger = new Logger(CreatorsController.name);

  constructor(
    private readonly creatorsService: CreatorsService
  ) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a Creator of secret Santa event' })
  @ApiResponse({ type: Creator, status: 201 })
  create(@Body() createCreatorDto: CreateCreatorDto): Promise<Creator>{
    return this.creatorsService.create(createCreatorDto);
  }

  @Get(':publicId')
  @ApiBearerAuth()
  @UseGuards(CreatorAuthGuard)
  @ApiOperation({ summary: 'Return a Creator of secret Santa event by public id' })
  @ApiResponse({ type: Creator, status: 200 })
  @ApiResponse({ status: 404, description: 'Creator not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access' })
  @ApiResponse({ status: 406, description: 'Has not access' })
  findOne(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string): Promise<Creator> {
    if (auth.publicId !== publicId) {
      throw new NotAcceptableException();
    }

    return this.creatorsService.findOne(publicId);
  }
  
  @Patch(':publicId')
  @ApiBearerAuth()
  @UseGuards(CreatorAuthGuard)
  @ApiOperation({ summary: 'Upadte a Creator of secret Santa event by public id' })
  @ApiResponse({ type: Creator, status: 200 })
  @ApiResponse({ status: 404, description: 'Creator not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access' })
  @ApiResponse({ status: 406, description: 'Has not access' })
  update(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string, @Body() updateCreatorDto: UpdateCreatorDto): Promise<Creator> {
    this.logger.log(`publicId: ${publicId}`);
    this.logger.log(`auth.publicId: ${auth.publicId}`);
    if (auth.publicId !== publicId) {
      throw new NotAcceptableException();
    }

    return this.creatorsService.update(publicId, updateCreatorDto);
  }
}