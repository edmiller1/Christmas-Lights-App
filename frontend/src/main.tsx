import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import "./index.css";
import { Decoration, Home, SignIn, SignUp } from "./pages";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/home", element: <Home /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },
  {
    path: "/decoration/:decorationId",
    element: <Decoration />,
  },
]);

//@ts-ignore
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("token");
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");

  return {
    headers: {
      token: token || "",
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

//TODO Remove the dangerouslyLocalStorage before deployng to prod

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={import.meta.env.VITE_KINDE_DOMAIN}
      logoutUri="http://localhost:3000/home"
      redirectUri="http://localhost:3000/home"
      onRedirectCallback={(user, app_state: any) => {
        if (
          !user.given_name &&
          !user.family_name &&
          app_state.type === "register"
        ) {
          user.given_name = app_state.firstname;
          user.family_name = app_state.lastname;
        }
        console.log(user);
        const userObj = JSON.stringify(user);
        localStorage.setItem("user", userObj);
      }}
      isDangerouslyUseLocalStorage
    >
      <ApolloProvider client={client}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Toaster />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ApolloProvider>
    </KindeProvider>
  </React.StrictMode>
);
