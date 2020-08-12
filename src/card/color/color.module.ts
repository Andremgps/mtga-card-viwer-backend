import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorEntity } from './color.entity';
import { ColorService } from './color.service';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  providers: [ColorService],
  exports: [ColorService],
})
export class ColorModule {}
