import { Module } from '@nestjs/common';
import { ProducerRegistrationModule } from './modules/producer-registration/producer-registration.module';


@Module({
  imports: [ProducerRegistrationModule],
  controllers: [],
  providers: [],
})
export class ProducerRegistrationAppModule {}
