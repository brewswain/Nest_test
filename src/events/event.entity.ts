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
    // cascade: true,
  })
  attendees: Attendee[];
}
