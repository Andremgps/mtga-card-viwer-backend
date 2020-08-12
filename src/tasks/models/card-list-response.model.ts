import { CardResponseModel } from './card-response.model';

export interface CardListResponseModel {
  data: CardResponseModel[];
  has_more: boolean;
  next_page: string;
  object: string;
}
