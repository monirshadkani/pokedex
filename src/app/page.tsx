"use client";
import { httpClient } from "@/lib/api";
import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import { PokemonCard } from "@/components/pokemonCard";

export default function Home() {
  const [pokemons, setPokemons] = useState<any[]>([]);

  const fetchPokemons = async () => {
    const response = await httpClient.get("pokemon").json();
    console.log(response.data[0]);
    setPokemons(response.data);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
