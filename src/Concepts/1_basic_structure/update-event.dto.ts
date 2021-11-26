import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

// As we can see here, we want to use the same data that we used for our CreateEventDto, but apply
// different rules to these params. Mapped-types helps us out with this by using the PartialType()
// Method:
export class UpdateEventDto extends PartialType(CreateEventDto) {
  // By using PartialType() in this manner, we just ensured that our UpdateEventDto  uses the
  // exact same params that exist in our CreateEventDto, but they'll all be marked as optional.
  // Neat!
}
