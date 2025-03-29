"use client";
import React from "react";
import { PokemonCard } from "../components/PokemonCard";
import { SearchInput } from "@/components/SearchBar";
import { Pokemon } from "@/types/pokemon";
import { useState, useMemo } from "react";
import { UsePokemonTypes } from "@/contexts/PokemonTypesContext";
import { PokemonModal } from "./PokemonModal";
import { EvolutionTree } from "./EvolutionTree";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as "en" | "fr";

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const openPokemonModal = (pokemon: Pokemon) => () => {
    setSelectedPokemon(pokemon);
    console.log("perf1");
  };
  const closePokemonModal = () => {
    setSelectedPokemon(null);
    console.log("close modal");
  };

  const handleEvolutionClick = (pok: Pokemon) => {
    setSelectedPokemon(pok);
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
        pokemon.name[currentLanguage].toLowerCase().includes(term)
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
          return (
            multiplier *
            a.name[currentLanguage].localeCompare(b.name[currentLanguage])
          );
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
    currentLanguage,
  ]);

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4">
          <SearchInput onSearch={setSearchTerm} />
        </div>
        <div className="flex gap-2">
          <label>{t("sort_by")}:</label>
          <select
            onChange={(e) =>
              setSortField(
                e.target.value as "name" | "id" | "weight" | "height"
              )
            }
          >
            <option value="id">{t("sort.id")}</option>
            <option value="name">{t("sort.name")}</option>
            <option value="weight">{t("sort.weight")}</option>
            <option value="height">{t("sort.height")}</option>
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
            <option value="">{t("all_types")}</option>
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
            <option value="">{t("all_generations")}</option>
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
        {selectedPokemon && (
          <EvolutionTree
            onEvolutionClick={handleEvolutionClick}
            pokemon={selectedPokemon}
          />
        )}
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
