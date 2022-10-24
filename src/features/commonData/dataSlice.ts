import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICompanyData } from "types/company.interface";
import { IProductData } from "types/product.interface";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import API from "api";

// TYPES ----------------------------------------
type DataType = {
  table: {
    page: "companies" | "products";
    companies: ICompanyData[];
    products: IProductData[];
    loading: boolean;
    received: boolean;
    selected: {
      company: ICompanyData;
      product: IProductData;
    };
  };
  logs: {
    companyLogs: string[];
    productLogs: string[];
    systemLogs: string[];
    loading: boolean;
    received: boolean;
  };
};
// TYPES ----------------------------------------
// initialState ----------------------------------------
const initialState: DataType = {
  table: {
    page: "companies",
    companies: [],
    products: [],
    loading: true,
    received: false,
    selected: {
      company: {} as ICompanyData,
      product: {} as IProductData,
    },
  },
  logs: {
    companyLogs: [],
    productLogs: [],
    systemLogs: [],
    loading: true,
    received: false,
  },
};
// initialState ----------------------------------------
// async thunk --------------------------------
export const fetchLogs = createAsyncThunk("data/fetchLogs", async () => {
  const response = await API.search.getHomePageLogs();
  return response;
});

export const fetchCompaniesData = createAsyncThunk(
  "data/fetchCompaniesData",
  async () => {
    const response = await API.company.getAllCompanies();
    return response;
  }
);

export const fetchProductsData = createAsyncThunk(
  "data/fetchProductsData",
  async () => {
    const response = await API.product.getAllProducts();
    return response;
  }
);
// async thunk --------------------------------
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    sortCompaniesByFilter: (
      state,
      action: PayloadAction<{ sortBy: keyof ICompanyData; filter: number }>
    ) => {
      state.table.companies = state.table.companies.sort((a, b) => {
        return a[action.payload.sortBy]! > b[action.payload.sortBy]!
          ? action.payload.filter === 2
            ? -1
            : 1
          : action.payload.filter === 2
          ? 1
          : -1;
      });
    },
    setSelectedCompany: (state, action: PayloadAction<ICompanyData>) => {
      state.table.selected.company = action.payload;
    },
    sortProductsByFilter: (
      state,
      action: PayloadAction<{ sortBy: keyof IProductData; filter: number }>
    ) => {
      state.table.products = state.table.products.sort((a, b) => {
        return a[action.payload.sortBy]! > b[action.payload.sortBy]!
          ? action.payload.filter === 2
            ? -1
            : 1
          : action.payload.filter === 2
          ? 1
          : -1;
      });
    },
    setSelectedProduct: (state, action: PayloadAction<IProductData>) => {
      state.table.selected.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.logs.loading = true;
        state.logs.received = false;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.logs.companyLogs = action.payload.companyLogs;
        state.logs.productLogs = action.payload.productLogs;
        state.logs.systemLogs = action.payload.systemLogs;
        state.logs.loading = false;
        state.logs.received = true;
      })
      .addCase(fetchLogs.rejected, (state) => {
        state.logs.loading = false;
        state.logs.received = false;
      })
      .addCase(fetchCompaniesData.pending, (state) => {
        state.table.loading = true;
        state.table.received = false;
      })
      .addCase(fetchCompaniesData.fulfilled, (state, action) => {
        state.table.page = "companies";
        state.table.companies = action.payload;
        state.table.loading = false;
        state.table.received = true;
      })
      .addCase(fetchCompaniesData.rejected, (state) => {
        state.table.loading = false;
        state.table.received = false;
      })
      .addCase(fetchProductsData.pending, (state) => {
        state.table.loading = true;
        state.table.received = false;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.table.page = "products";
        state.table.products = action.payload;
        state.table.loading = false;
        state.table.received = true;
      })
      .addCase(fetchProductsData.rejected, (state) => {
        state.table.loading = false;
        state.table.received = false;
      });
  },
});
export const {
  sortCompaniesByFilter,
  setSelectedCompany,
  sortProductsByFilter,
  setSelectedProduct,
} = dataSlice.actions;
export const selectTableData = (state: RootState) => state.data.table;
export const selectedProductData = (state: RootState) =>
  state.data.table.selected.product;
export const selectedCompanyData = (state: RootState) =>
  state.data.table.selected.company;
export const selectDataLogs = (state: RootState) => state.data.logs;
export default dataSlice.reducer;
