import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // We can place this filter  here to ensure that we only receive specific log messages in our terminal.
    // I'll leave this commented out in our root main.ts so that you can mess around with it and see it
    // in action
    logger: ['error', 'warn', 'debug'],
  });

  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
