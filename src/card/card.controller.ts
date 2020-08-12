import { Controller, Get, Param, Query } from '@nestjs/common';
import { CardService } from './card.service';
import { CardEntity } from './card.entity';
import { FilterCardDto } from './dto/filter-card.dto';
import { PaginatedCardResultDto } from './dto/paginated-card-result.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async findAll(
    @Query() filterCardDto: FilterCardDto,
  ): Promise<PaginatedCardResultDto> {
    filterCardDto.page = Number(filterCardDto.page) || 1;
    filterCardDto.limit = Number(filterCardDto.limit) || 20;
    filterCardDto.cmc = Number(filterCardDto.cmc);
    filterCardDto.matchAllColors = filterCardDto.matchAllColors
      ? JSON.parse(filterCardDto.matchAllColors)
      : false;
    return await this.cardService.findAll(filterCardDto);
  }

  @Get(':card_id')
  async findOne(@Param('card_id') cardId: number): Promise<CardEntity> {
    return await this.cardService.findById(cardId);
  }
}
