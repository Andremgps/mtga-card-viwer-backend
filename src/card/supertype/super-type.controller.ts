import { Controller, Get } from '@nestjs/common';
import { SuperTypeService } from './super-type.service';
import { SuperTypeEntity } from './super-type.entity';

@Controller('super_type')
export class SuperTypeController {
  constructor(private readonly superTypeService: SuperTypeService) {}

  @Get()
  async findAll(): Promise<SuperTypeEntity[]> {
    return await this.superTypeService.findAll();
  }
}
