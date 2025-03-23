import { createContext, useContext } from "react";
import { Pokemon } from "../types/pokemon";

export const PokemonContext = createContext<Pokemon[]>([]);

export const UsePokemons = () => {
  const context = useContext(PokemonContext);
  return context;
};
