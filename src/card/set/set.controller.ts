import { Controller, Get } from '@nestjs/common';
import { SetEntity } from './set.entity';
import { SetService } from './set.service';

@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Get()
  async findAll(): Promise<SetEntity[]> {
    return await this.setService.findAll();
  }
}
