import { SetEntity } from 'src/card/set/set.entity';

export interface CardResponseModel {
  name: string;
  all_sets: SetEntity[];
  set: string;
  color_identity: string[];
  cmc: number;
  rarity: string;
  type_line: string;
  layout: string;
  card_faces: {
    name: string;
    image_uris: {
      normal: string;
    };
  }[];
  image_uris: {
    normal: string;
  };
}
