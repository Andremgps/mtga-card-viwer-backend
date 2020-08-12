import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTypeEntity } from './sub-type.entity';
import { SubTypeService } from './sub-type.service';
import { SubTypeController } from './sub-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubTypeEntity])],
  providers: [SubTypeService],
  controllers: [SubTypeController],
  exports: [SubTypeService],
})
export class SubTypeModule {}
