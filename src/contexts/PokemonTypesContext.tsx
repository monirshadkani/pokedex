import { createContext, useContext } from "react";
import { Type } from "@/types/pokemon";

export const PokemonTypesContext = createContext<Type[]>([]);

export const UsePokemonTypes = () => {
  const context = useContext(PokemonTypesContext);
  return context;
};
