import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// Entities usually simply refer to a class that represents a table in our DB--essentially a
// Macro-class, if you would. Think stuff like Order, Product, etc.

// typeORM's @Entity decorator will come up with a table name for us automatically. We can
// manually select a table name by using our first optional param as shown below. The
// second optional parameter is an object containing a set of entity options. We can also
// specify the name in this object: {name: 'event'} etc
@Entity()
export class Event {
  // Every entity must have a primary column. We have some decorators to use here:
  // PrimaryGeneratedColumn automatically gives an autogenerated identifier. I'm
  // using Postgres so it's the equivalent of SEQUENCE.
  // We can also pass 'uuid' or 'rowid' as a parameter. We can also use
  // @PrimaryColumn for inherent attributes such as CC numbers, phone numbers, etc.
  // If we want Composite Keys, we can use @PrimaryColumn for each property.
  @PrimaryGeneratedColumn()
  id: number;

  // Every other property that needs to be a table column in the entity should use
  // @Column(). Also note that we can manually specify our column type, name, length etc.
  // https://typeorm.io/#/entities/column-options
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  event_date: Date;

  @Column()
  address: string;
}
