import { Pokemon } from "@/types/pokemon";
import { usePokemonTypeMatching } from "@/hooks/usePokemonTypes";
import { pokemonGenerations } from "./PokemonList";
import { memo, useState, cloneElement, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface PokemonModalProps {
  isOpen: boolean;
  close: () => void;
  pokemon: Pokemon;
  children: React.ReactNode;
}

const PokemonModalComponent = ({
  isOpen,
  close,
  pokemon,
  children,
}: PokemonModalProps) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as "en" | "fr";
  const [imgShiny, setImgShiny] = useState(false);
  const matchedTypes = usePokemonTypeMatching(pokemon?.types || []);
  const pokGen = useMemo(
    () => pokemonGenerations.find((gen) => gen.id === pokemon?.generation),
    [pokemon?.generation]
  );

  const stats = useMemo(
    () =>
      Object.entries(pokemon?.stats || {}).map(([statName, statValue]) => (
        <div key={statName} className="flex justify-between">
          <span className="text-gray-800">{t(`stats.${statName}`)}:</span>
          <span className="text-gray-800">{statValue}</span>
        </div>
      )),
    [pokemon?.stats, t]
  );

  if (!isOpen || !pokemon) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-2xl relative rounded-lg">
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-800 text-xl hover:text-gray-600"
        >
          ✕
        </button>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="mb-2">
              <h2 className="text-xl font-bold text-gray-900">
                {pokemon.name[currentLanguage]}
              </h2>
            </div>

            <div className="flex items-center gap-2 mb-2 text-gray-800">
              <span>#{pokemon.id}</span>
              <span>•</span>
              <span>{pokGen?.name}</span>
            </div>

            <div className="flex justify-center mb-4">
              <img
                className="w-24 h-24 cursor-pointer"
                onClick={() => setImgShiny((imgShiny) => !imgShiny)}
                src={imgShiny ? pokemon.image_shiny : pokemon.image}
                alt={pokemon.name[currentLanguage]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-800">{t("height")}</div>
                <div className="text-gray-800">{pokemon.height}</div>
              </div>
              <div>
                <div className="text-sm text-gray-800">{t("weight")}</div>
                <div className="text-gray-800">{pokemon.weight}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {matchedTypes.map((type, index) =>
                type ? (
                  <div key={index} className="flex items-center gap-1">
                    <img
                      className="w-4 h-4"
                      src={type.image}
                      alt={type.name[currentLanguage]}
                    />
                    <span className="text-gray-800">
                      {type.name[currentLanguage]}
                    </span>
                  </div>
                ) : null
              )}
            </div>

            <div className="mb-4">
              <h3 className=" mb-2 font-bold text-gray-900">
                {t("stats_title")}
              </h3>
              <div className="space-y-1 ">{stats}</div>
            </div>

            {cloneElement(
              children as React.ReactElement<{ isShiny: boolean }>,
              {
                isShiny: imgShiny,
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PokemonModal = memo(
  PokemonModalComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.isOpen === nextProps.isOpen &&
      prevProps.pokemon?.id === nextProps.pokemon?.id
    );
  }
);
