"use client";
import React from "react";
import { PokemonCard } from "../components/PokemonCard";
import { SearchInput } from "@/components/SearchBar";
import { Pokemon } from "@/types/pokemon";
import { useState, useEffect, useMemo } from "react";
import { UsePokemonTypes } from "@/contexts/PokemonTypesContext";
import { PokemonModal } from "./PokemonModal";
import { EvolutionTree } from "./EvolutionTree";

interface PokemonListProps {
  pokemons: Pokemon[];
}
export const pokemonGenerations = [
  { id: 1, name: "Kanto" },
  { id: 2, name: "Johto" },
  { id: 3, name: "Hoenn" },
  { id: 4, name: "Sinnoh" },
  { id: 5, name: "Unova" },
  { id: 6, name: "Kalos" },
  { id: 7, name: "Alola" },
  { id: 8, name: "Galar" },
  { id: 9, name: "Paldea" },
];

export const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const openPokemonModal = (pokemon: Pokemon) => () => {
    setSelectedPokemon(pokemon);
    console.log("perf1");
  };
  const closePokemonModal = () => {
    setSelectedPokemon(null);
    console.log("close modal");
  };

  const types = UsePokemonTypes();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<
    "name" | "id" | "weight" | "height"
  >("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [typeIDFilter, setTypeIDFilter] = useState<number | null>(null);
  const [generationFilter, setGenerationFilter] = useState<number | null>(null);

  const filteredPokemons = useMemo(() => {
    let result = pokemons;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((pokemon) =>
        pokemon.name.en.toLowerCase().includes(term)
      );
    }

    if (typeIDFilter) {
      result = result.filter((pokemon) => pokemon.types.includes(typeIDFilter));
    }

    if (generationFilter) {
      result = result.filter(
        (pokemon) => pokemon.generation === generationFilter
      );
    }

    return result.sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;
      switch (sortField) {
        case "name":
          return multiplier * a.name.en.localeCompare(b.name.en);
        case "id":
          return multiplier * (a.id - b.id);
        case "weight":
          return multiplier * (a.weight - b.weight);
        case "height":
          return multiplier * (a.height - b.height);
        default:
          return 0;
      }
    });
  }, [
    pokemons,
    searchTerm,
    sortField,
    sortDirection,
    typeIDFilter,
    generationFilter,
  ]);

  return (
    <>
      <div>
        <SearchInput onSearch={setSearchTerm} />
        <div className="flex gap-2">
          <label>Sort by:</label>
          <select
            onChange={(e) =>
              setSortField(
                e.target.value as "name" | "id" | "weight" | "height"
              )
            }
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
            <option value="height">Height</option>
          </select>
          <button
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            {sortDirection === "asc" ? "▲" : "▼"}
          </button>
        </div>
        <div>
          <select
            onChange={(e) =>
              setTypeIDFilter(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name.en}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) =>
              setGenerationFilter(
                e.target.value ? Number(e.target.value) : null
              )
            }
          >
            <option value="">All Generations</option>
            {pokemonGenerations.map((generation) => (
              <option key={generation.id} value={generation.id}>
                {generation.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <PokemonModal
        isOpen={selectedPokemon !== null}
        close={closePokemonModal}
        pokemon={selectedPokemon as Pokemon}
      >
        {selectedPokemon && <EvolutionTree pokemon={selectedPokemon} />}
      </PokemonModal>
      <div className="p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard
            handlePokemonClick={openPokemonModal(pokemon)}
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </div>
    </>
  );
};
