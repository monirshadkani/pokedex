import { UsePokemonTypes } from "@/contexts/PokemonTypesContext";
import { Type } from "@/types/pokemon";
import { useMemo } from "react";

export const usePokemonTypeMatching = (typeIds: number[]) => {
  const types = UsePokemonTypes();

  const matchedTypes = useMemo(() => {
    return typeIds
      .map((typeId: number) => types.find((type) => type.id === typeId))
      .filter((type): type is Type => type !== undefined);
  }, [typeIds, types]);

  return matchedTypes;
};
