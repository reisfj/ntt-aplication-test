import { Module } from '@nestjs/common';
import { ProducerRegistrationService } from './producer-registration.service';
import { ProducerRegistrationController  } from './producer-registration.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [ProducerRegistrationController ],
  providers: [ProducerRegistrationService, PrismaService],
})
export class ModulesModule {}
