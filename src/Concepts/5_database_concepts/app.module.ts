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
    ConfigModule.forRoot({
      isGlobal: true,

      load: [ormConfig],
    }),

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
