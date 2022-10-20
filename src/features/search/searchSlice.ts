import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "api";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { ICompanyData } from "types/company.interface";
import { IProductData } from "types/product.interface";

// TYPES ----------------------------------------
type SearchDataCompaniesType = {
  _id: string;
  name: string;
};
type SearchDataProductsType = {
  _id: string;
  name: string;
  company: string;
};
type SearchDataSelectedType = {
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
    selected: SearchDataSelectedType | undefined;
    resultCompany: ICompanyData | undefined;
    resultProduct: IProductData | undefined;
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
    selected: undefined,
    resultCompany: undefined,
    resultProduct: undefined,
    loading: true,
    received: false,
  },
};
// initialState ----------------------------------------
// async thunk --------------------------------
const fetchSearchData = createAsyncThunk("search/fetchSearchData", async () => {
  const response = await API.search.getSearchBarData();
  return response as Partial<SearchType>;
});

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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSearchData.pending, (state) => {
        state.search.loading = true;
        state.search.received = false;
      })
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.search.loading = false;
        state.search.received = true;
        action.payload.companyList.map((payload) => {});
      });
  },
});

export const {} = searchSlice.actions;
export const selectAuth = (state: RootState) => state.auth.auth;
export default searchSlice.reducer;

// thunk
