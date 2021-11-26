import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Our entry point. This is where we spin up our server, etc etc.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
