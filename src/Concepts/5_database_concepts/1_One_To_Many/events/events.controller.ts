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
  ) {}

  @Get('testTwo')
  async testTwo() {
    // This just loads an event. Something important to note though is that relations can be
    // either eager-loaded or lazy-loaded. Eager loading means the relations are always fetched
    //  along with the parent entity. This therefore makes sense to use when we know we'll need
    //  to use all of the data. Lazy-loading lets us load the main entity and then load the
    // relations on demand.

    // With lazy-loading, the field has to be wrapped in a promise. Eager loading is performed by
    // using an SQL join to a related table. We can actually configure our relation to be eager by
    // default by using the eager property on our configuration object in our @OneToMany
    // decorator.

    //Let's head over to our event.entity.ts and do that now.
    return await this.repository.findOne(
      1,
      // Once we set this to false, we no longer get our relations by default
      {
        loadEagerRelations: false,
        // If the relation isn't set to eager, we can still load the relations we need using the
        // relations property. It's an array of strings in which we put the relations we wish to
        // load. Experiment with this by removing eager:true in our entity, commenting our
        // loadEagerRelations line above, and uncommenting our relations line below:
        // relations: ['attendees'],
      },
    );
  }
}
