import { Controller, Param, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { SetEntity } from './set.entity';
import { SetService } from './set.service';

@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Get('image/:imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res: Response): void {
    return res.sendFile(image, { root: './images/sets' });
  }

  @Get()
  async findAll(): Promise<SetEntity[]> {
    return await this.setService.findAll();
  }
}
