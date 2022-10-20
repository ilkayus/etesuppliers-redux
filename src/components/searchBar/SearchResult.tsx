import {
  selectSearchResult,
  hideSearchResult,
} from "features/search/searchSlice";
import { useAppSelector, useAppDispatch } from "hooks/typedReduxHooks";
import Components from "components";

const SearchResult = () => {
  const result = useAppSelector(selectSearchResult);
  const dispatch = useAppDispatch();
  return (
    <div className="search-result-container">
      {result.show ? (
        result.resultLoading === true ? (
          <>
            <Components.Loading />
            <button
              className="search-result-return"
              onClick={() => dispatch(hideSearchResult())}
            >
              Return
            </button>
          </>
        ) : (
          <>
            <button
              className="search-result-return"
              onClick={() => dispatch(hideSearchResult())}
            >
              Return
            </button>
            {result.type === "product" ? (
              <Components.Product selected={result.result} />
            ) : (
              <Components.Company selected={result.result} />
            )}
          </>
        )
      ) : (
        <>
          <h1>Products</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            atque, officia impedit magnam repudiandae dolorem ipsum natus nihil,
            quam error suscipit placeat quas voluptatem nisi exercitationem
            minus asperiores magni modi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            consequuntur non molestiae consequatur doloremque possimus,
            cupiditate beatae? Quisquam mollitia eos cumque impedit provident
            repudiandae aut tempore vero. Tempora, ut quidem.
          </p>
        </>
      )}
    </div>
  );
};

export default SearchResult;
