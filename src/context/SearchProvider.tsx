import { createContext, useState } from "react";

type SearchContextType = {
  search: any | undefined;
  setSearch: React.Dispatch<React.SetStateAction<any | undefined>>;
};

const ISearchContextState = {
  search: undefined,
  setSearch: () => {},
};

const SearchContext = createContext<SearchContextType>(ISearchContextState);

export const SearchProvider = ({ children }: any) => {
  const [search, setSearch] = useState<any | undefined>(undefined);
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
