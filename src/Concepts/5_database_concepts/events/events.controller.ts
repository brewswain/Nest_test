import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, Repository } from 'typeorm';

import { Event } from './event.entity';

import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Attendee } from './attendee.entity';

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,

    // Ignore this @InjectRepository until you complete learning about our @OneToMany
    // and @ManyToOne decorators.

    // Let's discussing creating a relationship between 2 entities.
    // First step is we need to temporarily inject the Attendee Repository into our controller.
    // Something to remember is that when we inject an entity repository in the context of a
    //  module, we need to add it in our .forFeature() call of said module. Let's go to
    // events.module.ts
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
  ) {}

  @Get()
  async findAll() {
    this.logger.log(`findAll endpoint hit.`);
    const events = await this.repository.find();
    this.logger.debug(`Found ${events.length} events.`);
    return events;
  }

  @Get('/test')
  async test() {
    return await this.repository.find({
      select: ['id', 'event_date'],
      where: [
        {
          id: MoreThan(3),
          event_date: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        { description: Like('%meet%') },
      ],
      take: 2,
      order: {
        id: 'DESC',
      },
    });
  }

  // Let's set up a new test endpoint:
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
    // decorator. Let's head over to our event.entity.ts and do that now.
    return await this.repository.findOne(
      1,
      // Once we set this to false, we no longer get our relations by default
      {
        // loadEagerRelations: false,
        // If the relation isn't set to eager, we can still load the relations we need using the
        // relations property. It's an array of strings in which we put the relations we wish to
        // load. Experiment with this by removing eager:true in our entity, commenting our
        // loadEagerRelations line above, and uncommenting our relations line below:
        relations: ['attendees'],
      },
    );
  }

  // Ignore here until we use @InjectRepository in line 39!
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

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const event = await this.repository.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
  ) {
    await this.repository.save({
      ...input,
      event_date: new Date(input.event_date),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto,
  ) {
    const event = await this.repository.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }

    return await this.repository.save({
      ...event,
      ...input,
      event_date: input.event_date
        ? new Date(input.event_date)
        : event.event_date,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.repository.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }
    await this.repository.remove(event);
  }
}
