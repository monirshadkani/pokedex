"use client";
import React from "react";
import { UsePokemons } from "@/contexts/PokemonContext";
import { PokemonList } from "@/components/PokemonList";

export default function Home() {
  const pokemons = UsePokemons();
  return <PokemonList pokemons={pokemons} />;
}
