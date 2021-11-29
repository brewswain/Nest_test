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

  // Let's make our event field now in our attendee.entity.ts.
  @OneToMany(() => Attendee, (attendee) => attendee.event, {
    // Ignore below until you check out the writeup on events.controller.ts

    // This must be done with caution, as this has a performance cost.
    eager: true,
    // Now, when we hit our 'testTwo' endpoint, we'll get our relations sent to
    // us by default due to our eager flag. However, even when we configure our
    // relation to be eager loading, we can skip it in our find and findOne()
    // methods back in our events.controller.ts

    // Ignore here until you work on the associationTest endpoint.

    // As described in typeorm's documentation, "We can set up cascade options in our
    // relations, in the cases when we want our related object to be saved whenever
    // the other object is saved."
    // Cascade has a couple of options we can use. We can set it to true so
    // that cascading would work for all the operations, or we can specify the
    //  operations we want in an array (cascade: ['associationTest'])
    cascade: true,
    // Please note that this is not equal to db level cascading. This is a
    // typeorm only feature. Let's head back to our controller
  })
  attendees: Attendee[];
}
