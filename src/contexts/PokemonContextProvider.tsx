"use client";
import { PokemonContext } from "./PokemonContext";
import { httpClient } from "@/lib/api";
import { useState, useEffect } from "react";

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pokemons, setPokemons] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = (await httpClient.get("pokemon").json()) as {
        data: any[];
      };
      setPokemons(response.data);
    };
    fetchPokemons();
  }, []);
  return (
    <PokemonContext.Provider value={pokemons}>
      {children}
    </PokemonContext.Provider>
  );
};
