import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, Repository } from 'typeorm';
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from './update-event.dto';

@Controller('/events')

// It might be interesting to you to note that EventsController is actually a Provider!
// We made it a Provider when we used our @InjectRepository decorator. For clarity, a
// Provider in this context is a class based object that NestJs knows about. It should
// be created *by* Nest, and its dependencies should be resolved by using dependency
// injection.
export class EventsController {
  // Dependency Injection's job is to figure out what other classes a class needs, and
  // pass them into said class (how many times can i say class 😭). In this case, our
  // class was our repository class. This is how we can make our methods use
  // this.repository.findOne() etc.

  // Dependency injection in this case allows for decoupling of code. This also makes
  // testing easier, since we can pass test data as dependencies! The dependency can
  // be injected through the constructor which is the most common path, but we can
  // also inject through the property.
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
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

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.repository.findOne(id);
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

  async update(
    @Param('id') id,
    @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto,
  ) {
    const event = await this.repository.findOne(id);

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
    await this.repository.remove(event);
  }
}
