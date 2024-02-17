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
import { OrganizersService } from '@/src/organizers/organizers.service';
import { CreateOrganizerDto } from '@/src/organizers/dto/create-organizer.dto';
import { UpdateOrganizerDto } from '@/src/organizers/dto/update-organizer.dto';
import { Auth } from '@/src/auth/auth-decorator/auth.decorator';
import { AccessAuth } from '@/src/auth/entities/access-auth.entity';
import { IsPublic } from '@/src/auth/is-public-decorator/is-public.decorator';
import { Organizer } from '@/src/organizers/entities/organizer.entity';
import { OrganizerAuthGuard } from '@/src/auth/organizer-auth-guard/organizer-auth.guard';

@ApiTags('Organizers')
@Controller('organizers')
export class OrganizersController {
  private readonly logger = new Logger(OrganizersController.name);

  constructor(
    private readonly organizersService: OrganizersService
  ) {}

  @Post()
  @IsPublic()
  @ApiOperation({ summary: 'Create a Organizer of secret Santa event' })
  @ApiResponse({ type: Organizer, status: 201 })
  create(@Body() createOrganizerDto: CreateOrganizerDto): Promise<Organizer>{
    return this.organizersService.create(createOrganizerDto);
  }

  @Get(':publicId')
  @ApiBearerAuth()
  @UseGuards(OrganizerAuthGuard)
  @ApiOperation({ summary: 'Return a Organizer of secret Santa event by public id' })
  @ApiResponse({ type: Organizer, status: 200 })
  @ApiResponse({ status: 404, description: 'Organizer not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access' })
  @ApiResponse({ status: 406, description: 'Has not access' })
  findOne(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string): Promise<Organizer> {
    if (auth.publicId !== publicId) {
      throw new NotAcceptableException();
    }

    return this.organizersService.findOne(publicId);
  }
  
  @Patch(':publicId')
  @ApiBearerAuth()
  @UseGuards(OrganizerAuthGuard)
  @ApiOperation({ summary: 'Upadte a Organizer of secret Santa event by public id' })
  @ApiResponse({ type: Organizer, status: 200 })
  @ApiResponse({ status: 404, description: 'Organizer not found by public id' })
  @ApiResponse({ status: 401, description: 'Unauthorized for access' })
  @ApiResponse({ status: 406, description: 'Has not access' })
  update(
    @Auth() auth: AccessAuth,
    @Param('publicId') publicId: string, @Body() updateOrganizerDto: UpdateOrganizerDto): Promise<Organizer> {
    this.logger.log(`publicId: ${publicId}`);
    this.logger.log(`auth.publicId: ${auth.publicId}`);
    if (auth.publicId !== publicId) {
      throw new NotAcceptableException();
    }

    return this.organizersService.update(publicId, updateOrganizerDto);
  }
}