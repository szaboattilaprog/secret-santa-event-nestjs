import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AppMailerService } from '@/src/app-mailer/app-mailer.service';
import { Organizer } from '@/src/organizers/entities/organizer.entity';
import { CreateOrganizerDto } from '@/src/organizers/dto/create-organizer.dto';
import { UpdateOrganizerDto } from '@/src/organizers/dto/update-organizer.dto';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';
import { OtpService } from '@/src/common/otp/otp.service';

@Injectable()
export class OrganizersService {
  constructor(private organizersRepository: OrganizersRepository, private appMailerService: AppMailerService, private otpService: OtpService) {}

  async create(createOrganizerDto: CreateOrganizerDto): Promise<Organizer> {
    let organizer = await this.organizersRepository.findOneByEmail(createOrganizerDto.email);

    if (organizer) {
      organizer = await this.organizersRepository.update(organizer.publicId, { otpVerified: false });
    } else {
      organizer = await this.organizersRepository.create(createOrganizerDto);
    }

    delete organizer.id;
    this.appMailerService.sendWhoYouAreOTPMail(organizer);

    return organizer;
  }

  async findOne(publicId: string): Promise<Organizer> {
    const organizer = await this.organizersRepository.findOne(publicId);
    if (!organizer) {
      throw new NotFoundException('Organizer not found');
    }

    delete organizer.id;

    return organizer;
  }

  async update(publicId: string, updateOrganizerDto: UpdateOrganizerDto): Promise<Organizer> {
    let organizer = await this.organizersRepository.findOne(publicId);
    if (!organizer) {
      throw new NotFoundException('Organizer not found');
    }

    if (!updateOrganizerDto.otp && !organizer.otpVerified) {
      throw new BadRequestException('Not accepted update Organizer when OTP is not verified');
    }

    if (updateOrganizerDto.otp && await this.otpService.verifyOtp(organizer.email, updateOrganizerDto.otp)) {
      organizer = await this.organizersRepository.update(organizer.publicId, { otpVerified: true });
      delete organizer.id;
      
      this.appMailerService.sendYouAreOrganizerMail(organizer);
    } else if (organizer.otpVerified) {
      organizer = await this.organizersRepository.update(publicId, updateOrganizerDto);
    }

    delete organizer.id;

    return organizer;
  }
}
