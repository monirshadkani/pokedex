import { Pokemon } from "@/types/pokemon";
import { UsePokemons } from "@/contexts/PokemonContext";
import { useMemo, memo } from "react";

export const EvolutionTree = memo(
  ({
    pokemon,
    onEvolutionClick,
    isShiny = false,
  }: {
    pokemon: Pokemon;
    onEvolutionClick: (pok: Pokemon) => void;
    isShiny?: boolean;
  }) => {
    const allPoks = UsePokemons();

    const pokemonEvolutionFrom = useMemo(
      () =>
        allPoks.filter((pok) =>
          Object.keys(pokemon.evolvedFrom).includes(pok.id.toString())
        ),
      [allPoks, pokemon.evolvedFrom]
    );

    const pokemonEvolutionTo = useMemo(
      () =>
        allPoks.filter((pok) =>
          Object.keys(pokemon.evolvesTo).includes(pok.id.toString())
        ),
      [allPoks, pokemon.evolvesTo]
    );

    return (
      <div className="w-24 border border-solid border-indigo-600">
        <p className="font-semibold text-gray-900">Evolutions:</p>
        <div>
          {pokemonEvolutionFrom.map((pok) => (
            <div key={pok.id} onClick={() => onEvolutionClick(pok)}>
              <img
                className="w-6 h-6"
                src={isShiny ? pok.image_shiny : pok.image}
              />
              <p className="text-violet-900" key={1}>
                {pok.name.en}{" "}
              </p>
              <p className="text-xs text-gray-500">
                {pokemon.evolvedFrom[pok.id.toString()]}
              </p>
            </div>
          ))}
        </div>
        <div>
          {pokemonEvolutionTo.map((pok) => (
            <div key={pok.id} onClick={() => onEvolutionClick(pok)}>
              <img
                className="w-6 h-6"
                src={isShiny ? pok.image_shiny : pok.image}
              />
              <p className="text-violet-900" key={1}>
                {" "}
                {pok.name.en}{" "}
              </p>
              <p className="text-xs text-gray-500">
                {pokemon.evolvesTo[pok.id.toString()]}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
