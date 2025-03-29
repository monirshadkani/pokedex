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
  const { t } = useTranslation();
  const [imgShiny, setImgShiny] = useState(false);
  const matchedTypes = usePokemonTypeMatching(pokemon?.types || []);
  const pokGen = useMemo(
    () => pokemonGenerations.find((gen) => gen.id === pokemon?.generation),
    [pokemon?.generation]
  );

  const stats = useMemo(
    () =>
      Object.entries(pokemon?.stats || {}).map(([statName, statValue]) => (
        <p className="text-gray-900" key={statName}>
          {t(`stats.${statName}`)}: {statValue}
        </p>
      )),
    [pokemon?.stats, t]
  );

  if (!isOpen || !pokemon) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="modal-content">
            <button className="text-gray-900" onClick={close}>
              {t("close")}
            </button>
            <p className="text-gray-900">#{pokemon.id}</p>
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              onClick={() => {
                setImgShiny((imgShiny) => !imgShiny);
              }}
              src={imgShiny ? pokemon.image_shiny : pokemon.image}
              alt={pokemon.name.en}
            />

            <p className="text-gray-900">{pokemon.name.en}</p>
            <p className="text-gray-900">
              {t("generation")}: {pokGen?.name}
            </p>

            <p className="text-gray-900">
              {t("height")}: {pokemon.height}
            </p>
            <p className="text-gray-900">
              {t("weight")}: {pokemon.weight}
            </p>
            <div className="flex space-x-2">
              {matchedTypes.map((type, index) =>
                type ? (
                  <div key={index} className="flex items-center space-x-1">
                    <img className="w-6 h-6" src={type.image} />
                    <p className="text-gray-900">{type.name.en}</p>
                  </div>
                ) : null
              )}
            </div>
            <div>{stats}</div>
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
