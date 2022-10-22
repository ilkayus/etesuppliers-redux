import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
