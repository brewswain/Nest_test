import { IsDateString, IsString, Length } from 'class-validator';

// Please note that  we can combine DTOs with various levels of
// validation at this layer. Remember, we'll tend to use these for request bodies so having
// validation at this level is incredibly useful. An example can be shown below:

// NB: KEEP IN MIND THESE ARE THIRD PARTY VALIDATORS, CHECK IMPORTS UP TOP.

export class CreateEventDto {
  @Length(2, 255, { message: 'Beep Boop try again' })
  @IsString()
  name: string;

  @Length(5, 255)
  description: string;

  @IsDateString()
  event_date: string;

  // If you came from main.ts to see what I meant about validation groups, you can probably see
  // that this is super useful. Being able to apply different rules per route in the same DTO is
  // incredible. Look at our create() and update() methods in our events.controller to see our
  // groups assignment that we put in place to let it work like this!
  @Length(5, 255, { groups: ['create'] })
  @Length(10, 20, { groups: ['update'] })
  address: string;
}
