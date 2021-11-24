// Entities usually simply refer to a class that represents a table in our DB--essentially a
// Macro-class, if you would. Think stuff like Order, Product, etc.

export class Event {
  id: number;
  name: string;
  description: string;
  event_date: Date;
  address: string;
}
