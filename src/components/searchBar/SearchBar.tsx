import React, { useEffect } from "react";
import {
  selectSearch,
  fetchSearchData,
  setSelected,
  fetchSelected,
} from "features/search/searchSlice";
import { useAppSelector, useAppDispatch } from "hooks/typedReduxHooks";
import "./style/SearchBar.css";
import { icons } from "images";
import Components from "components";

const SearchBar = () => {
  //-------------------------------
  const state = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSearchData());
  }, [dispatch]);
  //-------------------------------
  const getSearchResult = () => {
    if (state.selected._id !== "") dispatch(fetchSelected(state.selected));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.list as any;
    const opts = list.options.namedItem(e.target.value);
    if (opts) dispatch(setSelected({ ...opts.dataset }));
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        list="search-list"
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.key === "Enter") getSearchResult();
        }}
        onChange={handleSearchChange}
      />
      <datalist id="search-list">
        {state.received ? <Components.SearchBarList /> : null}
      </datalist>
      <img src={icons.search} alt="search icon" onClick={getSearchResult} />
    </div>
  );
};

export default SearchBar;
