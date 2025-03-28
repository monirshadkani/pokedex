export interface Pokemon {
  id: number;
  generation: number;
  name: { fr: string; en: string };
  image: string;
  image_shiny: string;
  height: number;
  weight: number;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
  types: number[];
  evolvedFrom: Record<string, string>;
  evolvesTo: Record<string, string>;
}

export interface Type {
  id: number;
  name: { fr: string; en: string };
  image: string;
}
