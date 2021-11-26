import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ignore this bit until you're reading about Pipes and validation.
  // Based on the name however, we're adding global validation!
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
