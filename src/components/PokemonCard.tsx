import { useState } from "react";
import React from "react";

interface Pokemon {
  id: number;
  name: { fr: string; en: string };
  image: string;
  generation: number;
  types: string[];
}

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  console.log(pokemon.name);

  return (
    <div
      className="flex flex-col md:flex-row justify-between md:items-start gap-1"
      key={pokemon.id}
    >
      <p>{pokemon.id}</p>
      <h3>{pokemon.name.en}</h3>
      <img src={pokemon.image}></img>
      <p>{pokemon.generation}</p>
      <p>{pokemon.types}</p>
    </div>
  );
};
