import { Test, TestingModule } from '@nestjs/testing';
import { AnonimChatMessagesGateway } from '@/src/anonim-chat-messages/anonim-chat-messages.gateway';
import { AuthService } from '@/src/auth/auth.service';
import { AnonimChatMessagesService } from '@/src/anonim-chat-messages/anonim-chat-messages.service';
import { AnonimChatMessagesRepository } from '@/src/anonim-chat-messages/entities/repositories/anonim-chat-messages-repository/anonim-chat-messages-repository';
import { PostgresqlPrismaService } from '@/src/databases/postgresql-prisma/postgresql-prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreatorsService } from '@/src/creators/creators.service';
import { ParticipantsService } from '@/src/participants/participants.service';
import { CreatorsRepository } from '@/src/creators/entities/repositories/creators-repository/creators-repository';
import { ParticipantsRepository } from '@/src/participants/entities/repositories/participants-repository/participants-repository';

describe('AnonimChatMessagesGateway', () => {
  let gateway: AnonimChatMessagesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnonimChatMessagesGateway, 
        AuthService,
        ConfigService,
        JwtService,
        AnonimChatMessagesService, 
        CreatorsService,
        ParticipantsService,
        AnonimChatMessagesRepository, 
        CreatorsRepository,
        ParticipantsRepository,
        PostgresqlPrismaService
      ],
    }).compile();

    gateway = module.get<AnonimChatMessagesGateway>(AnonimChatMessagesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});