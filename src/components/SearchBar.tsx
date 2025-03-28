import React from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search"
      onChange={(e) => onSearch(e.target.value)}
      className="border p-1 rounded"
    />
  );
};
