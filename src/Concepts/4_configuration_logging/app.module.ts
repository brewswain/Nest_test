import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppBeep } from './app.beep';
import { AppController, TestController } from './app.controller';
import { AppNewService } from './app.new.service';
import { AppService } from './app.service';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    // We use this ConfigModule for loading .env variables by default.
    // Let's do some configuration now:
    ConfigModule.forRoot({
      isGlobal: true,
      // ignoreEnvFile: true can be used if we're using dockerized envs etc. to disable loading
      // any files.

      // Ok so here's where things get interesting. we extracted our typeOrmModule configuration
      // into its own file, located at config/orm.config.ts. Once we did TableInheritance, we used
      // our load property to nab said config below.
      load: [ormConfig],

      // pretty useful, check .env to see how APP_URL and SUPPORT_EMAIL can now be used
      expandVariables: true,
    }),
    // Once we did that, we changed our .forRoot() into .forRootAsync() which accepts a function.
    // We'll pass said function  by using our useFactory option:
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),

    EventsModule,
  ],
  controllers: [AppController, TestController],

  providers: [
    { provide: AppService, useClass: AppNewService },
    { provide: 'APP_NAME', useValue: 'Nest events backend' },
    {
      provide: 'MESSAGE',
      inject: [AppBeep],
      useFactory: (app) => `${app.beep()} Factory`,
    },
    AppBeep,
  ],
})
export class AppModule {}
