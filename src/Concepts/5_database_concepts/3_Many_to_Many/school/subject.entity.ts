import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects, { cascade: true })
  // @JoinTable() is necessary here. It only goes on one of the entities, however.
  // if we were to add some data to our db, we should see these tables:
  // subject
  // subject_teachers_teacher
  // teacher

  // subject_teachers_teacher is the teacher that holds relations between the two entities.
  // we can optionally name our entity in @JoinTable():
  @JoinTable({
    // subject is the owning side in our case since it has the @JoinTable() decorator.
    joinColumn: {
      name: 'test_name',
      // referencedColumnName = the name of the column to point to  in the subject table
      referencedColumnName: 'id',
    },
    // We can configure the sdame for the other side using inverseJoinColumn()
    inverseJoinColumn: {},
  })
  teachers: Teacher[];
}
