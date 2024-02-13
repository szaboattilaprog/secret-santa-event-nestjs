import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PostgresqlPrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error'
  >
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PostgresqlPrismaService.name);

  constructor() {
    super({
      log: [
        { level: 'error', emit: 'event' },
        //{ level: 'info', emit: 'event' },
        { level: 'query', emit: 'event' },
        { level: 'warn', emit: 'event' },
      ],
      errorFormat: 'pretty',
    });

    this.$on('query', (event: Prisma.QueryEvent) => {
      this.logger.log('Query: ' + event.query);
      this.logger.log('Duration: ' + +event.duration + 'ms');
    });

    this.$on('error', (event) => {
      this.logger.verbose(event.target);
    });

    this.$on('warn', (event) => {
      this.logger.verbose(event.target);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
