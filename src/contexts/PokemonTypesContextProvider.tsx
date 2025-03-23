"use client";
import { PokemonTypesContext } from "../contexts/PokemonTypesContext";
import { httpClient } from "@/lib/api";
import { useState, useEffect } from "react";

export const PokemonTypesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [types, setTypes] = useState<any[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = (await httpClient.get("types").json()) as {
        data: any[];
      };
      setTypes(response.data);
    };
    fetchTypes();
  }, []);

  return (
    <PokemonTypesContext.Provider value={types}>
      {children}
    </PokemonTypesContext.Provider>
  );
};
