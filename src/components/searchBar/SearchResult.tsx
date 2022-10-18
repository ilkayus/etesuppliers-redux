import { useEffect, useState } from "react";
import useSearch from "hooks/useSearch";
import useAuth from "hooks/useAuth";
import API from "api";
import Components from "components";

const SearchResult = () => {
  const { auth } = useAuth();
  const { search, setSearch } = useSearch();
  const [result, setResult] = useState<any>();
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    const getSearchResult = async () => {
      const res = search.hasOwnProperty("company")
        ? await API.product.getOneProduct(auth, search._id)
        : await API.company.getOneCompany(auth, search._id);
      //  console.log(res);
      return res;
    };
    setRequesting(true);
    getSearchResult()
      .then((data) => setResult(data))
      .finally(() => setRequesting(false));
  }, [search]);
  return (
    <div className="search-result-container">
      {requesting ? null : (
        <>
          <button
            className="search-result-return"
            onClick={() => setSearch(undefined)}
          >
            Return
          </button>
          {search === undefined ? null : result.hasOwnProperty("company") ? (
            <Components.Product selected={result} />
          ) : (
            <Components.Company selected={result} />
          )}
        </>
      )}
    </div>
  );
};

export default SearchResult;
