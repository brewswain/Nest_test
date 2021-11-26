import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppNewService {
  constructor(
    @Inject('APP_NAME')
    private readonly name: string,
    @Inject('MESSAGE')
    private readonly message: string,
  ) {}
  getHello(): string {
    return `hi from ${this.name}, ${this.message}`;
  }
}
