import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "api";
import { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { ICompanyData } from "types/company.interface";
import { IProductData } from "types/product.interface";

// TYPES ----------------------------------------
export type SearchDataCompaniesType = {
  _id: string;
  name: string;
};
export type SearchDataProductsType = {
  _id: string;
  name: string;
  company: string;
};
export type SearchDataSelectedType = {
  _id: string;
  type: "company" | "product";
};
type SearchType = {
  search: {
    data: {
      companies: SearchDataCompaniesType[];
      products: SearchDataProductsType[];
    };
    searchBarList: JSX.Element[];
    selected: SearchDataSelectedType;
    searchResult: {
      type: "company" | "product";
      show: boolean;
      result: ICompanyData | IProductData | undefined;
      resultLoading: boolean;
    };
    loading: boolean;
    received: boolean;
  };
};
// TYPES ----------------------------------------
// initialState ----------------------------------------
const initialState: SearchType = {
  search: {
    data: {
      companies: [] as SearchDataCompaniesType[],
      products: [] as SearchDataProductsType[],
    },
    searchBarList: [] as JSX.Element[],
    selected: {
      _id: "",
      type: "product",
    },
    searchResult: {
      show: false,
      type: "product",
      resultLoading: true,
      result: undefined,
    },
    loading: true,
    received: false,
  },
};
// initialState ----------------------------------------
// async thunk --------------------------------
export const fetchSearchData = createAsyncThunk(
  "search/fetchSearchData",
  async () => {
    const response = await API.search.getSearchBarData();
    return response;
  }
);
export const fetchSelected = createAsyncThunk(
  "search/fetchSelected",
  async (selected: SearchDataSelectedType) => {
    const response =
      selected.type === "product"
        ? await API.product.getOneProduct(selected._id)
        : await API.company.getOneCompany(selected._id);
    return response;
  }
);
// async thunk --------------------------------
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    loading: (state) => {
      state.search.loading = true;
      state.search.received = false;
    },
    received: (state) => {
      state.search.received = true;
      state.search.loading = false;
    },
    setSelected: {
      reducer(state, action: PayloadAction<SearchDataSelectedType>) {
        state.search.selected = action.payload;
      },
      prepare({ idvalue, type }) {
        return {
          payload: {
            _id: idvalue,
            type: type,
          },
        };
      },
    },
    hideSearchResult: (state) => {
      state.search.searchResult.show = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchData.pending, (state) => {
        state.search.loading = true;
        state.search.received = false;
      })
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.search.loading = false;
        state.search.received = true;
        state.search.data.companies = action.payload.companyList;
        state.search.data.products = action.payload.productList;
      })
      .addCase(fetchSelected.pending, (state) => {
        state.search.searchResult.show = true;
        state.search.searchResult.resultLoading = true;
        state.search.searchResult.type = state.search.selected.type;
      })
      .addCase(fetchSelected.fulfilled, (state, action) => {
        state.search.searchResult.resultLoading = false;
        state.search.searchResult.result = action.payload;
      })
      .addCase(fetchSelected.rejected, (state) => {
        state.search.searchResult.show = false;
        state.search.searchResult.resultLoading = false;
      });
  },
});

export const { setSelected, hideSearchResult } = searchSlice.actions;
export const selectSearchData = (state: RootState) => state.search.search.data;
export const selectSearchResult = (state: RootState) =>
  state.search.search.searchResult;
export const selectSearch = (state: RootState) => state.search.search;
export const selectSearchSelected = (state: RootState) =>
  state.search.search.selected;
export default searchSlice.reducer;

// thunk
