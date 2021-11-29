import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @Length(2, 255, { message: 'Beep Boop try again' })
  @IsString()
  name: string;

  @Length(5, 255)
  description: string;

  @IsDateString()
  event_date: string;

  @Length(5, 255, { groups: ['create'] })
  @Length(10, 20, { groups: ['update'] })
  address: string;
}
