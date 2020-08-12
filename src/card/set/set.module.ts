import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetEntity } from './set.entity';
import { SetService } from './set.service';
import { SetController } from './set.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SetEntity])],
  providers: [SetService],
  controllers: [SetController],
  exports: [SetService],
})
export class SetModule {}
