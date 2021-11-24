import { Injectable } from '@nestjs/common';

// Services are classes where we put logic that ISN'T directly linked to HTTP responses etc.
// Basically they're utils. Also @Injectable just marks them as a Provider:
// https://docs.nestjs.com/providers#dependency-injection

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
