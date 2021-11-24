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
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from './update-event.dto';

// Always remember -- Anytime we create a new controller, we gotta import it into our .module file

@Controller('/events')
export class EventsController {
  // Good Practise is to keep our Controllers as light as possible by limiting the amount of
  // actions we place in each controller. Obviously, this isn't always realistic but it's good
  // to keep in mind.

  // NB: I'm using this private `events` variable as a simple way to store our Events in
  // memory since this is just a test app and I haven't implemented a db yet. Also I decided to
  // explicitly write `private events` here instead of `#events` for clarity,
  private events: Event[] = [];

  @Get()
  findAll() {
    return this.events;
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
  findOne(@Param('id') id) {
    const event = this.events.find((event) => event.id === parseInt(id));

    return event;
  }

  // If we look at create() and update(), it's easy to assume that we need some kind of
  // input/ request body. We can do this with our @Body decorator.
  @Post()

  // Please note our use of a DTO here. For a writeup and what a DTO is etc, look at
  // create-event.dto.ts, or just command/ctrl click the DTO below.
  create(@Body() input: CreateEventDto) {
    // naming our DTO object fields the same as out entities isn't really the best practise,
    // but in this case, it lets us use the spread syntax to make this example easier:
    const event = {
      ...input,
      event_date: new Date(input.event_date),
      id: this.events.length + 1,
    };

    this.events.push(event);

    return event;
  }

  @Patch(':id')

  // If we check our UpdateEventDto out, we can see a slightly more advanced usage of our DTO
  // to show how we get away with reusing them for different usecases to avoid repeating code etc.
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    const index = this.events.findIndex((event) => event.id === parseInt(id));

    // Pretty ugly but I mean come on, this is temporary code
    this.events[index] = {
      ...this.events[index],
      ...input,
      event_date: input.event_date
        ? new Date(input.event_date)
        : this.events[index].event_date,
    };
  }

  @Delete(':id')
  // Self-explanatory, but this decorator allows us to choose what statusCode we want to get
  // returned by our route handler--in this case a 204/No Content
  @HttpCode(204)
  remove(@Param('id') id) {
    this.events = this.events.filter((event) => event.id !== parseInt(id));
  }
}
