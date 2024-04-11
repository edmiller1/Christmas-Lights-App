import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import "./index.css";
import {
  Admin,
  Decoration,
  Home,
  NotFound,
  Notifications,
  Profile,
  RoutePlanning,
  SignIn,
  SignUp,
  SiteMap,
  Terms,
  VerifyDecoration,
} from "./pages";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { Dashboard } from "./pages/Admin/components/index.ts";
import {
  Favourites,
  History,
  NotificationSettings,
  PersonalInfo,
  YourDecorations,
} from "./pages/Profile/pages/index.ts";

const isAuthenticated = sessionStorage.getItem("token");

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
  {
    path: "/verify-decoration/:decorationId",
    element: isAuthenticated ? <VerifyDecoration /> : <NotFound />,
  },
  {
    path: "/notifications",
    element: isAuthenticated ? <Notifications /> : <SignIn />,
  },
  {
    path: "/profile",
    element: isAuthenticated ? <Profile /> : <SignIn />,
  },
  { path: "/profile/personal-info", element: <PersonalInfo /> },
  { path: "/profile/notification-settings", element: <NotificationSettings /> },
  { path: "/profile/decorations", element: <YourDecorations /> },
  { path: "/profile/history", element: <History /> },
  { path: "/profile/favourites", element: <Favourites /> },
  { path: "/route-planning", element: <RoutePlanning /> },
  { path: "/sitemap", element: <SiteMap /> },
  { path: "/terms", element: <Terms /> },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
    ],
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
        if (app_state.type === "admin") {
          redirect("/admin");
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
