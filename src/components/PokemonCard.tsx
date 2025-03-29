import { memo } from "react";
import React from "react";
import { usePokemonTypeMatching } from "@/hooks/usePokemonTypes";
import { Pokemon } from "../types/pokemon";
import { useTranslation } from "react-i18next";

interface PokemonCardProps {
  pokemon: Pokemon;
  handlePokemonClick?: () => void;
}

export const PokemonCard = memo(
  ({ pokemon, handlePokemonClick }: PokemonCardProps) => {
    const matchedTypes = usePokemonTypeMatching(pokemon.types);
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language as "en" | "fr";

    const handleMouseEnter = () => {
      const mainImage = new Image();
      const shinyImage = new Image();
      mainImage.src = pokemon.image;
      shinyImage.src = pokemon.image_shiny;
    };

    return (
      <div
        onMouseEnter={handleMouseEnter}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
        key={pokemon.id}
        onClick={handlePokemonClick}
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-gray-500">#{pokemon.id}</span>
          <span className="text-gray-500">Gen {pokemon.generation}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">
          {pokemon.name[currentLanguage]}
        </h3>
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 object-contain"
            src={pokemon.image}
            alt={pokemon.name[currentLanguage]}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {matchedTypes.map((type, index) =>
            type ? (
              <div
                key={index}
                className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full"
              >
                <img
                  className="w-4 h-4"
                  src={type.image}
                  alt={type.name[currentLanguage]}
                />
                <span className="text-sm text-gray-600">
                  {type.name[currentLanguage]}
                </span>
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }
);
