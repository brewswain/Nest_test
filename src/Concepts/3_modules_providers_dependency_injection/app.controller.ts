import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/bye')
  getBye() {
    return 'Au Revoir';
  }
}

@Controller('/test')
export class TestController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/bye')
  getBye() {
    return 'Au Revoir from Test';
  }
}
