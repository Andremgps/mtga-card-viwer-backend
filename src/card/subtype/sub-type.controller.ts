import { Controller, Get } from '@nestjs/common';
import { SubTypeService } from './sub-type.service';
import { SubTypeEntity } from './sub-type.entity';

@Controller('sub_type')
export class SubTypeController {
  constructor(private readonly subTypeService: SubTypeService) {}

  @Get()
  async findAll(): Promise<SubTypeEntity[]> {
    return await this.subTypeService.findAll();
  }
}
