import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CardModule } from './card/card.module';
import { TasksModule } from './tasks/tasks.module';
import { config } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    ScheduleModule.forRoot(),
    CardModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
