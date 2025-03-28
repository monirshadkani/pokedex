import { Pokemon } from "@/types/pokemon";
import { UsePokemons } from "@/contexts/PokemonContext";
import { useMemo, useState } from "react";

export const EvolutionTree = ({
  pokemon,
}: //handleClick,
{
  pokemon: Pokemon;
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

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  //const handleClick = setSelectedPokemon(pok);

  return (
    <div>
      <p className="font-semibold text-gray-900">Evolutions:</p>
      <div>
        {pokemonEvolutionFrom.map((pok) => (
          <div key={pok.id}>
            <img className="w-6 h-6" src={pok.image} />
            <img className="w-6 h-6" src={pok.image_shiny} />
            <p className="text-violet-900" key={1}>
              {" "}
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
          <div key={pok.id}>
            <img className="w-6 h-6" src={pok.image} />
            <img className="w-6 h-6" src={pok.image_shiny} />
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
};
