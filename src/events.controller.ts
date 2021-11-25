import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from './update-event.dto';

// Always remember -- Anytime we create a new controller, we gotta import it into our .module file

@Controller('/events')
export class EventsController {
  // Good Practise is to keep our Controllers as light as possible by limiting the amount of
  // actions we place in each controller. Obviously, this isn't always realistic but it's good
  // to keep in mind.

  // A Repository is a class that manages the whole database table. It's job is to take care
  // of all its entities.This can mean creating new, changing some, or even deleting some
  // entities.
  // TypeORM has a generic repository class using TypeScript Generics so that it can work
  // with any Entity. This class contains all the basic methods for fetching and saving entities
  // like save(), find(), fineOne(), and remove().
  // Alternatively, there's a Specific Repository class for custom features. Basically this'll be
  // useful for complex or repeated custom queries

  // Onto Practical examples!
  // In NestJS, we often receive classes using Dependency Injection. Basically NestJS is in control
  // of creating classes which follows this flow. Note that our @InjectRepository decorator needs
  // the entity class for the repository to be passed in as an argument.
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  // Now that we've set up our Injection, note that our Repository methods return a promise,
  // which makes sense since we're using database modification. Let's make sure all our methods are
  // async and use some repository methods:
  @Get()
  async findAll() {
    return await this.repository.find();
  }

  // Let's look at declaring dynamic paths here--it should be pretty self-explanatory:
  @Get(':id')
  // The interesting part here is our @Param decorator.
  // This allows us to access the route parameter as a property of the decorated method parameter
  // (our id, as stated in line 34) for use inside the body of our method (findOne in this case).
  // Think of it like using Context in Go or how we nabbed params for our paths in Next.Js'
  // getStaticProps.

  // An interesting thing here to note is that if we left our decorator empty, it'd actually
  // return an object with our response, making it suitable for when your response expects multiple
  // entities/params.
  async findOne(@Param('id') id) {
    return await this.repository.findOne(id);
  }

  // If we look at create() and update(), it's easy to assume that we need some kind of
  // input/ request body. We can do this with our @Body decorator.
  @Post()
  // Please note our use of a DTO here. For a writeup and what a DTO is etc, look at
  // create-event.dto.ts, or just command/ctrl click the DTO below.
  async create(@Body() input: CreateEventDto) {
    await this.repository.save({
      ...input,
      event_date: new Date(input.event_date),
    });
  }

  @Patch(':id')

  // If we check our UpdateEventDto out, we can see a slightly more advanced usage of our DTO
  // to show how we get away with reusing them for different usecases to avoid repeating code etc.
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
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
  // Self-explanatory, but this decorator allows us to choose what statusCode we want to get
  // returned by our route handler--in this case a 204/No Content
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.repository.findOne(id);
    await this.repository.remove(event);
  }
}
