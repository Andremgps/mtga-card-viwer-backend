import { Controller, Get } from '@nestjs/common';
import { TypeEntity } from './type.entity';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  async findAll(): Promise<TypeEntity[]> {
    return await this.typeService.findAll();
  }
}
