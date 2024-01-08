import { NestFactory } from '@nestjs/core';
import { ProducerRegistrationAppModule } from './app.producer-registration';

async function bootstrap() {
  const app = await NestFactory.create(ProducerRegistrationAppModule);
  await app.listen(4000);
}
bootstrap();
