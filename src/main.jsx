import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// global context
import GlobalDataProvider from "./context/GlobalDataProvider";

//react-router-dom
import { BrowserRouter } from "react-router-dom";

//tanstack query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/NotFoundPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <BrowserRouter>
        <GlobalDataProvider>
          <QueryClientProvider
            client={queryClient}
            onReset={() => (window.location.href = "/")}
          >
            <App />
          </QueryClientProvider>
        </GlobalDataProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
