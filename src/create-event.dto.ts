import {
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

// DTOs sound really intimidating, but they're shockingly simple. You can think of DTOs as
//"an immutable object that encapsulates our data that we want to send from one place to
// another". In essentia, we can simply think of them as a box that we use to transfer
// specifically shaped data from one layer to a next.

// More specifically to our usecase, we'll usually use DTOs for stuff like request bodies,
// since we'll want our data to be shaped in a defined manner. This is really useful for if
// we want to get specific data from our Body, like input from a form with some optional fields
// that we don't need for whatever endpoint your request uses -- Our DTO can strip out all
// optional fields that we actually don't want for whatever functionality we implemented to make
// sure that our 'box' isn't overfilled.

// Please note that DTOs are actually NOT supposed to be treated as an interface. As ripped
// straight from NestJS docs:
// "An Interface is an abstract type that includes a certain set of fields that a type must
//  include to implement the interface".

// This differentiation can be summed up as "DTOs format our data into a predefined shape, while
// Interfaces perform type checking & define the data that can be passed to our
// controllers/services".
// This is getting super Verbose, so let's look at some code for a very simple example:

export class ExampleDto {
  name: string;
  description: string;
  event_date: string;
  address: string;
}

// It's that simple. The text writeup was necessary though, because we want to make sure that we
// understand when we want to use a DTO vs when we want to use Interfaces. Please look at our
// create() method inside of our events.controller.ts file to see us use our DTO above.

// ------------------------------- Bonus functionality -----------------------------------------
// Please note that these can be way more powerful when we combine them with various levels of
// validation at this layer. Remember, we'll tend to use these for request bodies so having
// validation at this level is incredibly useful. An example can be shown below:

// NB: KEEP IN MIND THESE ARE THIRD PARTY VALIDATORS, CHECK IMPORTS UP TOP.

export class ValidationExampleDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsAlphanumeric()
  address: string;
}

// We  can even transform our payloads from being regular objects to be shaped according to our
// DTO definitions, but the docs explain it cleaner than I can, so check this out:
// https://docs.nestjs.com/techniques/validation#transform-payload-objects

// Let's turn use Validation etc as shown above, but in our actual CreateEventDto:
export class CreateEventDto {
  // If we fail any of these validation checks, we'll receive an error message in our response.
  // For example, if our name failed the length check we'd get a 400 status code & this message
  // "Name must be longer than or equal to 2 characters" by default. Let's make a custom message:
  @Length(2, 255, { message: 'Beep Boop try again' })
  @IsString()
  name: string;

  @Length(5, 255)
  description: string;

  @IsDateString()
  event_date: string;

  @Length(5, 255)
  address: string;
}
