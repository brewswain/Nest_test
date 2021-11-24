import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controllers let us specify our API endpoints.
// They have actions that are associated with specific paths.
// The Controller's job is to create endpoints using specific paths and HTTP methods.
// It then accepts requests, passes them on to our logic elsewhere in the project, & finally
// passes a response to our client.
// TLDR: It *controls*  the process of handling a request

// Now, we need to tell our Nest Application how to translate a path into controllers, and their
// actions. This is called 'Routing'. We can do this in a few ways. First, we can have all apps
// in our controller use a path prefix, like this:
// @Controller('/hello')
// Or like this:
// @Controller({
//   path: '/hello'
// })

// This a top-level path. Let's explore this below.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // If we look here, our action also doesn't have a path specified, and returns a 'Hello World'
  // message. If we were to make a GET request to localhost:3000 without any endpoints, we should
  // see our Hello World message get sent to us.
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // For this example, let's create a path.
  @Get('/bye')
  getBye() {
    return 'Au Revoir';
  }
}

// So as we see above, our new path we created would be hit by making a GET request to:
// 'localhost:3000/bye'. This is about what we expect, but as we def know, endpoints are often a
// bit more complex/nested. This is where our controller path comes into play. Let's take the
// same code, but add a path to our @Controller() decorator:
@Controller('/test')
export class TestController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // check out app.service.ts here to see our getHello() method!
    return this.appService.getHello();
  }

  @Get('/bye')
  getBye() {
    return 'Au Revoir from Test';
  }
}

// After we added our new `TestController` to our app.module file, we should notice that if we
// make a GET request to 'localhost:3000', we get our response in line 36, but if we make the
// same GET request to 'localhost:3000/test/bye', we'd get our response in line 55 instead. This
// is obviously familiar to us from the overall shape of our paths.go file.
