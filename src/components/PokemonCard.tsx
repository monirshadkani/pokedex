import { memo } from "react";
import React from "react";
import { usePokemonTypeMatching } from "@/hooks/usePokemonTypes";
import { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  handlePokemonClick?: () => void;
}

export const PokemonCard = memo<PokemonCardProps>(
  ({ pokemon, handlePokemonClick }) => {
    const matchedTypes = usePokemonTypeMatching(pokemon.types);

    const handleMouseEnter = () => {
      const mainImage = new Image();
      const shinyImage = new Image();
      mainImage.src = pokemon.image;
      shinyImage.src = pokemon.image_shiny;
    };

    return (
      <div
        onMouseEnter={handleMouseEnter}
        className=" flex-shrink-0 m-6 relative overflow-hidden w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        key={pokemon.id}
        onClick={handlePokemonClick}
      >
        <p>#{pokemon.id}</p>
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pokemon.name.en}
        </h3>
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={pokemon.image}
        ></img>
        <p>{pokemon.generation}</p>
        <div className="flex space-x-2">
          {matchedTypes.map((type, index) =>
            type ? (
              <div key={index} className="flex items-center space-x-1">
                <img className="w-6 h-6" src={type.image} />
                <p>{type.name.en}</p>
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }
);
