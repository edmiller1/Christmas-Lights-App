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
import {
  Admin,
  Decoration,
  NotFound,
  Notifications,
  Profile,
  SignIn,
  VerifyDecoration,
} from "./pages";
import { Dashboard, Login } from "./pages/Admin/components/index.ts";
import {
  Favourites,
  History,
  NotificationSettings,
  PersonalInfo,
  YourDecorations,
} from "./pages/Profile/pages/index.ts";

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
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/personal-info",
        element: <PersonalInfo />,
      },
      {
        path: "/profile/notification-settings",
        element: <NotificationSettings />,
      },
      {
        path: "/profile/decorations",
        element: <YourDecorations />,
      },
      {
        path: "/profile/history",
        element: <History />,
      },
      { path: "/profile/favourites", element: <Favourites /> },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/login",
        element: <Login />,
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
          <div className="h-full dark:bg-ch-dark dark:text-white bg-ch-light">
            <Toaster />
            <RouterProvider router={router} />
          </div>
        </ThemeProvider>
      </SessionContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
