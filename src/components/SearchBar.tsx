import React from "react";
import { useTranslation } from "react-i18next";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const { t } = useTranslation();

  return (
    <input
      type="text"
      placeholder={t("search")}
      onChange={(e) => onSearch(e.target.value)}
      className="border p-1 rounded"
    />
  );
};
