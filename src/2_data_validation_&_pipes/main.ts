import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // We can add global validation to our app by placing it here!

  // The tradeoff here is that we can't put individual settings for
  // our validationPipe for each route, so we're not gonna use it for this example,
  // but it's useful to show that it can be done by using:

  // app.useGlobalPipes(new ValidationPipe());

  // One of the main reasons that we'll want to configure validation
  // per route is if we want to use Validation Groups. We can
  // essentially have our input data be validated differently depending
  // on the context. Let's go over to create-event.dto.ts to see what
  // I'm talking about.

  await app.listen(3000);
}
bootstrap();
