import { CardEntity } from '../card.entity';

export class PaginatedCardResultDto {
  data: CardEntity[];
  page: number;
  limit: number;
  totalCount: number;
  hasMore: boolean;
}
