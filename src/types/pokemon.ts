export interface Pokemon {
  id: number;
  generation: number;
  name: { fr: string; en: string };
  image: string;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
  types: number[];
}

export interface Type {
  id: number;
  name: { fr: string; en: string };
  image: string;
}
