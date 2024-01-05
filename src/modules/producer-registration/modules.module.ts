import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService, PrismaService],
})
export class ModulesModule {}
