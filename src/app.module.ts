import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/producer-registration/modules.module';


@Module({
  imports: [ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
