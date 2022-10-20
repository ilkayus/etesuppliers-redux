import { selectSearchData } from "features/search/searchSlice";
import { useAppSelector } from "hooks/typedReduxHooks";

const SearchBarList = () => {
  const searchBarData = useAppSelector(selectSearchData);

  return (
    <>
      {searchBarData.companies.map((el: any, idx: number) => (
        <option
          key={idx + 1000}
          id={el.name}
          data-type="company"
          data-idvalue={el._id}
          value={el.name}
        ></option>
      ))}
      {searchBarData.products.map((el: any, idx: number) => (
        <option
          id={el.name}
          key={idx + 2000}
          data-type="product"
          data-idvalue={el._id}
          value={el.name}
        >
          {el.company.name}
        </option>
      ))}
    </>
  );
};

export default SearchBarList;
