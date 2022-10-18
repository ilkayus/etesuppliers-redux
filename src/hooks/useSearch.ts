import { useContext } from "react";
import SearchContext from "context/SearchProvider";

const useSearch = () => useContext(SearchContext);

export default useSearch;
