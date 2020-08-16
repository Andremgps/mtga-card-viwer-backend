import { Controller, Get } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorEntity } from './color.entity';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  async findAll(): Promise<ColorEntity[]> {
    return await this.colorService.findAll();
  }
}
