import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authorization/authSlice";
import authFormReducer from "../pages/authorization/authReducer";
import searchReducer from "../features/search/searchSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    form: authFormReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
