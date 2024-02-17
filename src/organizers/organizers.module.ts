import { Module } from '@nestjs/common';
import { OrganizersService } from '@/src/organizers/organizers.service';
import { OrganizersController } from '@/src/organizers/organizers.controller';
import { PostgresqlPrismaModule } from '@/src/databases/postgresql-prisma/postgresql-prisma.module';
import { OrganizersRepository } from '@/src/organizers/entities/repositories/organizers-repository/organizers-repository';
import { OtpService } from '@/src/common/otp/otp.service';

@Module({
  imports: [PostgresqlPrismaModule],
  controllers: [OrganizersController],
  providers: [OrganizersService, OrganizersRepository, OtpService],
  exports: [OrganizersService, OrganizersRepository],
})
export class OrganizersModule {}