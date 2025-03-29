"use client";
import React from "react";
import { UsePokemons } from "@/contexts/PokemonContext";
import { PokemonList } from "@/components/PokemonList";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";

export default function Home() {
  const { t } = useTranslation();
  const pokemons = UsePokemons();
  return (
    <div>
      <button onClick={() => i18n.changeLanguage("en")}>EN/ </button>
      <button onClick={() => i18n.changeLanguage("fr")}>FR</button>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}
