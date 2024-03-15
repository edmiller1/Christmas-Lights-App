import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import App from "./App.tsx";
import "./index.css";
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
  RoutePlanning,
  Search,
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
import { AuthProvider } from "./lib/hooks.tsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const hasSession = sessionStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/route-planning",
    element: <RoutePlanning />,
  },
  {
    path: "/decoration/:decorationId",
    element: <Decoration />,
  },
  {
    path: "/verify-decoration/:decorationId",
    element: hasSession ? <VerifyDecoration /> : <NotFound />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/profile",
    element: hasSession ? <Profile /> : <NotFound />,
  },
  {
    path: "/profile/personal-info",
    element: hasSession ? <PersonalInfo /> : <NotFound />,
  },
  {
    path: "/profile/notification-settings",
    element: hasSession ? <NotificationSettings /> : <NotFound />,
  },
  {
    path: "/profile/decorations",
    element: hasSession ? <YourDecorations /> : <NotFound />,
  },
  {
    path: "/profile/history",
    element: hasSession ? <History /> : <NotFound />,
  },
  {
    path: "/profile/favourites",
    element: hasSession ? <Favourites /> : <NotFound />,
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

//@ts-ignore
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("token");
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
    <Analytics />
    <SpeedInsights />
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="h-full dark:bg-ch-dark dark:text-white bg-ch-light">
            <Toaster />
            <RouterProvider router={router} />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
