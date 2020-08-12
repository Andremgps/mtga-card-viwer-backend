import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperTypeEntity } from './super-type.entity';
import { SuperTypeService } from './super-type.service';
import { SuperTypeController } from './super-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SuperTypeEntity])],
  providers: [SuperTypeService],
  controllers: [SuperTypeController],
  exports: [SuperTypeService],
})
export class SuperTypeModule {}
