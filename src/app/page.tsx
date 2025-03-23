"use client";
import React from "react";
import { PokemonCard } from "../components/PokemonCard";
import { UsePokemons } from "@/contexts/PokemonContext";

export default function Home() {
  const pokemons = UsePokemons();
  return (
    <div className="p-1 flex flex-wrap items-center justify-center">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
