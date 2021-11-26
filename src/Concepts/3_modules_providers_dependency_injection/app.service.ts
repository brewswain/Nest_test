import { Inject, Injectable } from '@nestjs/common';

// Once we do this, make sure we also make these changes to our
// app.new.service.ts
@Injectable()
export class AppService {
  constructor(
    @Inject('APP_NAME')
    private readonly name: string,
  ) {}
  getHello(): string {
    return `Hello World! from ${this.name}`;
  }
}
