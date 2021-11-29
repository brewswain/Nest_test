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

  @Get('testTwo')
  async testTwo() {
    return await this.repository.findOne(1, {
      relations: ['attendees'],
    });
  }

  @Get('associationTest')
  async associationTest() {
    const event = await this.repository.findOne(1, {
      relations: ['attendees'],
    });
    const attendee = new Attendee();
    attendee.name = 'bob but cascading';

    event.attendees.push(attendee);

    await this.repository.save(event);

    return event;
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
