import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsController } from './events.controller';

// Before all else, we created this module by using the nest cli!
// the command was:
// nest generate module events

// It even imported our new module inside of our app.module.ts,
// check it out then come back here!

// Let's move our event related things from our app.module into here.

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
})
export class EventsModule {}
