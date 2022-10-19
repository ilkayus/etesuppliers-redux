import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authorization/authSlice";
import authFormReducer from "../pages/authorization/authReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    form: authFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
