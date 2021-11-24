import { Module } from '@nestjs/common';
import { AppController, TestController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events.controller';

// Module is a class using the @Module Decorator.
// As we can see, here's where we import our controllers, providers, etc
@Module({
  imports: [],
  controllers: [AppController, TestController, EventsController],
  providers: [AppService],
})
export class AppModule {}
