import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsController } from './events.controller';
import { Attendee } from './attendee.entity';
import { Event } from './event.entity';

@Module({
  // Adding our Attendee here prevents any bugs where nest fails to recognise our entity.
  // Let's head back to our controller.
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  controllers: [EventsController],
})
export class EventsModule {}
