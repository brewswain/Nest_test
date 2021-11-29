import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @ManyToMany relations exist when...an entity can be related to multiple entities and vice versa.
  // This example works since one teacher can teach multiple subjects, but also multiple teachers can
  // teach the same subject.

  // Unlike @OneToMany, we can actually use the @ManyToMany decorator on only one entity. However, this
  // means we cna only fetch the related entities using *this* entity. So basically you'd be able to
  // fetch subjects from Teacher if it has this decorator, but if we also put it on our teacher property in
  // our Subject entity, we will be able to fetch teachers who can teach this subject.

  // Let's head over to subject.entity.ts
  @ManyToMany(() => Subject, (subject) => subject.teachers)
  subjects: Subject[];
}
