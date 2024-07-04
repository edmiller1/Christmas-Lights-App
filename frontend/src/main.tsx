import React from "react";
import ReactDOM from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import { HelmetProvider } from "react-helmet-async";
import { KindeProvider, useKindeAuth } from "@kinde-oss/kinde-auth-react";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    isAuthenticated: false, // This will be set after we wrap the app in an AuthProvider
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const { isAuthenticated } = useKindeAuth();
  return <RouterProvider router={router} context={{ isAuthenticated }} />;
}

function App() {
  return (
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={import.meta.env.VITE_KINDE_DOMAIN}
      logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URL}
      redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URL}
      isDangerouslyUseLocalStorage
    >
      <ApolloProvider client={client}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <HelmetProvider>
            <Toaster />
            <InnerApp />
          </HelmetProvider>
        </ThemeProvider>
      </ApolloProvider>
    </KindeProvider>
  );
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("kinde_token");
  const parsedToken = token ? JSON.parse(token) : {};
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");

  return {
    headers: {
      ...headers,
      latitude: latitude || "",
      longitude: longitude || "",
      authorization: token ? `Bearer ${parsedToken.access_token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:9000/api",
  credentials: "include",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: "ChristmasLightsApp",
  version: "0.1",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
