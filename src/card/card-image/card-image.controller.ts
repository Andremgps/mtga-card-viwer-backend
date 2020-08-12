import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('card_image')
export class CardImageController {
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res: Response): void {
    return res.sendFile(image, { root: './images/cards' });
  }
}
