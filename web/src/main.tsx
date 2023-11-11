import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import App from "./App.tsx";
import "./index.css";
import { supabase } from "./lib/supabaseClient.ts";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Toaster } from "./components/ui/toaster.tsx";
import { Decoration, NotFound, SignIn, VerifyDecoration } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/decoration/:decorationId",
        element: <Decoration />,
      },
      {
        path: "/verify-decoration/:decorationId",
        element: <VerifyDecoration />,
      },
    ],
  },

  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_USER_TOKEN_ID)!
  ).access_token;
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");

  return {
    headers: {
      "X-CSRF-TOKEN": token || "",
      latitude: latitude || "",
      longitude: longitude || "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:9000/api",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: "ChristmasLightsApp",
  version: "0.1",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SessionContextProvider supabaseClient={supabase}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="dark:bg-ch-dark dark:text-white text-ch-indigo bg-ch-light">
            <Toaster />
            <RouterProvider router={router} />
          </div>
        </ThemeProvider>
      </SessionContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
