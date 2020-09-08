import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('images/cards')
export class CardImageController {
  @Get('front/:imgpath')
  getCardImageFront(
    @Param('imgpath') image: string,
    @Res() res: Response,
  ): void {
    return res.sendFile(image, { root: './images/cards/front' });
  }
  @Get('back/:imgpath')
  getCardImageBack(
    @Param('imgpath') image: string,
    @Res() res: Response,
  ): void {
    return res.sendFile(image, { root: './images/cards/back' });
  }
}
