import { Pokemon } from "@/types/pokemon";
import { UsePokemons } from "@/contexts/PokemonContext";
import { useMemo, memo } from "react";
import { useTranslation } from "react-i18next";

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
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language as "en" | "fr";

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

    if (pokemonEvolutionFrom.length === 0 && pokemonEvolutionTo.length === 0) {
      return null;
    }

    return (
      <div className="mt-4">
        <h3 className="font-bold mb-2 text-gray-900">{t("evolutions")}</h3>

        {pokemonEvolutionFrom.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm mb-2 text-gray-900">{t("evolves_from")}</h4>
            <div className="space-y-2">
              {pokemonEvolutionFrom.map((pok) => (
                <div
                  key={pok.id}
                  onClick={() => onEvolutionClick(pok)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    className="w-6 h-6"
                    src={isShiny ? pok.image_shiny : pok.image}
                    alt={pok.name[currentLanguage]}
                  />
                  <div>
                    <p className="text-sm text-gray-900">
                      {pok.name[currentLanguage]}
                    </p>
                    <p className="text-xs text-gray-700">
                      {pokemon.evolvedFrom[pok.id.toString()]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pokemonEvolutionTo.length > 0 && (
          <div>
            <h4 className="text-sm mb-2 text-gray-900">{t("evolves_to")}</h4>
            <div className="space-y-2">
              {pokemonEvolutionTo.map((pok) => (
                <div
                  key={pok.id}
                  onClick={() => onEvolutionClick(pok)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    className="w-6 h-6"
                    src={isShiny ? pok.image_shiny : pok.image}
                    alt={pok.name[currentLanguage]}
                  />
                  <div>
                    <p className="text-sm text-gray-900">
                      {pok.name[currentLanguage]}
                    </p>
                    <p className="text-xs text-gray-700">
                      {pokemon.evolvesTo[pok.id.toString()]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);
