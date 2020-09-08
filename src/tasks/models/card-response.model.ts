import { SetEntity } from 'src/card/set/set.entity';

export interface CardResponseModel {
  name: string;
  all_sets: SetEntity[];
  set: string;
  color_identity: string[];
  cmc: number;
  mana_cost: string;
  rarity: string;
  type_line: string;
  layout: string;
  id: string;
  card_faces: {
    name: string;
    mana_cost: string;
    type_line: string;
    image_uris: {
      normal: string;
    };
  }[];
  image_uris: {
    normal: string;
  };
}
