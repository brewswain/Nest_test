import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, TestController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

// This module file looks lighter than before, but just follow the recc'd reading order
// to go through the steps!

// A module is like a toolbox that happens to be a singleton. When we started using
// TypeORM, we needed the typeORM module. These tools are like Controllers and providers.
// Nothing really new yet, but what's a Provider?

// In this case, a Provider can simply refer to a class that uses Dependency Injection.
// Let's go to our events.controller.ts file to see more.

// Static and Dynamic Modules are both used in Nest. Think of how our .forRoot(),
// .forFeature() methods are used to get functionality, then look at how we imported
// EventsModule in this very file! This difference in implementation is pretty interesting,
// so let's figure it out.

// When we want to configure our tools, we'll want to use a dynamic module. By that
// definition, .forRoot() is a dynamic module. Please see below how we configured it.
// If we hover over .forRoot(), we actually see that it's typed as a Dynamic Module!

// But what about our forFeature() method? That's also a dynamic module, but why
// didn't we provide an explicit configuration for what we wanted? Well, in this
// case, forFeature actually doesn't create another connection, as the typeORM module was
// previously created in the app.module. Once created and registered in one place,
// modules are not available globally. forFeature makes a specific Repository classlist
// available to use in that module's scope. Pretty neat!

// With that in mind, it's good to acknowledge that whenever we import a dynamic module,
//  we have 2 options available to us. We can either configure how a module behaves, or
//  we can modify the list of Providers exported from the module by specifying what
//  features we need. Note that they can be done at the same time!

// On the other hand. EventsModule is a Static module.

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'nest-events',
      entities: [Event],
      synchronize: true,
    }),

    EventsModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
