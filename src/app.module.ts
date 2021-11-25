import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, TestController } from './app.controller';
import { AppService } from './app.service';
import { Event } from './event.entity';
import { EventsController } from './events.controller';

// Module is a class using the @Module Decorator.
// As we can see, here's where we import our controllers, providers, etc
@Module({
  // Let's use the imports array here to use our TypeOrmModule. .forRoot()
  // is used to provide configuration that the module is going to use
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'nest-events',
      entities: [Event],
    }),
  ],
  controllers: [AppController, TestController, EventsController],
  providers: [AppService],
})
export class AppModule {}
