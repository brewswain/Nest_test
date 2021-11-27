import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendee } from './attendee.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  event_date: Date;

  @Column()
  address: string;

  // An event will have many attendees. This is a one to many relationship.
  // Note that we need to create an event field on our attendee entity.
  // Relations are defined using decorators. For our event, let's use a
  // OneToMany() decorator.

  // This decorator requires 2 arguments. The first argument is a function
  // that returns the type of our relation. In this case, we'll return an
  // Attendee type.

  // The second argument is another function  where the argument is our type.
  // From this function, we want to return the property of our related entity
  // (in this case, our event field we want to make on our Attendee entity)
  // that will point to the owner side.

  // Let's make our event field now in our attendee.entity.ts
  @OneToMany(() => Attendee, (attendee) => attendee.event)
  attendees: Attendee;
}
