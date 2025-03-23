import { useState, useEffect } from "react";
import React from "react";
import { UsePokemonTypes } from "@/contexts/PokemonTypesContext";
import { Pokemon } from "../types/pokemon";

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const types = UsePokemonTypes();
  const matchedTypes = pokemon.types.map((typeId: number) =>
    types.find((type) => type.id === typeId)
  );

  return (
    <div
      className=" flex-shrink-0 m-6 relative overflow-hidden w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
      key={pokemon.id}
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
};
