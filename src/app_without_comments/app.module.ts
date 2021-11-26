import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, TestController } from './app.controller';
import { AppService } from './app.service';
import { Event } from '../event.entity';
import { EventsController } from '../events.controller';

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

    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [AppController, TestController, EventsController],
  providers: [AppService],
})
export class AppModule {}
