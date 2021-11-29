import { Controller, Get, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from './event.entity';

import { Attendee } from './attendee.entity';

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
    // Let's discussing creating a relationship between 2 entities.
    // First step is we need to temporarily inject the Attendee Repository into our controller.
    // Something to remember is that when we inject an entity repository in the context of a
    //  module, we need to add it in our .forFeature() call of said module. Let's go to
    // events.module.ts
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
  ) {}

  @Get('testTwo')
  async testTwo() {
    return await this.repository.findOne(1, {
      // loadEagerRelations: false,

      relations: ['attendees'],
    });
  }

  @Get('associationTest')
  async associationTest() {
    // there are a couple ways of associating related entities. Let's start with a situation
    // where we have an event instance fetched without any relations.
    //
    // const event = await this.repository.findOne(1);
    // const attendee = new Attendee();
    // attendee.name = 'bob';
    // attendee.event = event;
    // await this.attendeeRepository.save(attendee);
    // return event;
    //
    // When we hit this endpoint, we should see that Jerry arrives inside of our db.
    // We actually don't need to fetch the event from the db if we know the id however:
    //
    // const event = new Event();
    // event.id = 1;
    // const attendee = new Attendee();
    // attendee.name = 'bob2';
    // attendee.event = event;
    // await this.attendeeRepository.save(attendee);
    // return event;
    //
    // The third option we have is to use the 'cascade' option of the relation. Let's
    // go back to event.entity.ts, then return here when we're done configuring our
    // cascade option:
    //
    const event = await this.repository.findOne(1, {
      relations: ['attendees'],
    });
    const attendee = new Attendee();
    attendee.name = 'bob but cascading';

    event.attendees.push(attendee);

    await this.repository.save(event);

    return event;

    // We need to be very careful when using cascading however, so keep that in mind.
  }
}
