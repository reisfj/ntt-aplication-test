import { Module } from '@nestjs/common';
import { ModulesService } from './producer-registration.service';
import { ModulesController } from './producer-registration.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService, PrismaService],
})
export class ModulesModule {}
