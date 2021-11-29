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

  @OneToMany(() => Attendee, (attendee) => attendee.event, {
    eager: true,
    // As described in typeorm's documentation, "We can set up cascade options in our
    // relations, in the cases when we want our related object to be saved whenever
    // the other object is saved."
    // Cascade has a couple of options we can use. We can set it to true so
    // that cascading would work for all the operations, or we can specify the
    //  operations we want in an array (cascade: ['associationTest'])
    cascade: true,
    // Please note that this is not equal to db level cascading. This is a
    // typeorm only feature. Let's head back to our controller.
  })
  attendees: Attendee[];
}
