import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import "./index.css";
import {
  Admin,
  Decoration,
  Error,
  NotFound,
  Notifications,
  PrivacyPolicy,
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

console.log(isAuthenticated);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/signup", element: <SignUp />, errorElement: <Error /> },
  { path: "/signin", element: <SignIn />, errorElement: <Error /> },
  {
    path: "/decoration/:decorationId",
    element: <Decoration />,
    errorElement: <Error />,
  },
  {
    path: "/verify-decoration/:decorationId",
    element:
      isAuthenticated && isAuthenticated.length > 0 ? (
        <VerifyDecoration />
      ) : (
        <NotFound />
      ),
    errorElement: <Error />,
  },
  {
    path: "/notifications",
    element:
      isAuthenticated && isAuthenticated.length > 0 ? (
        <Notifications />
      ) : (
        <SignIn />
      ),
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element:
      isAuthenticated && isAuthenticated.length > 0 ? <Profile /> : <SignIn />,
    errorElement: <Error />,
  },
  {
    path: "/profile/personal-info",
    element: <PersonalInfo />,
    errorElement: <Error />,
  },
  {
    path: "/profile/notification-settings",
    element: <NotificationSettings />,
    errorElement: <Error />,
  },
  {
    path: "/profile/decorations",
    element: <YourDecorations />,
    errorElement: <Error />,
  },
  { path: "/profile/history", element: <History />, errorElement: <Error /> },
  {
    path: "/profile/favourites",
    element: <Favourites />,
    errorElement: <Error />,
  },
  {
    path: "/route-planning",
    element: <RoutePlanning />,
    errorElement: <Error />,
  },
  { path: "/sitemap", element: <SiteMap />, errorElement: <Error /> },
  { path: "/terms", element: <Terms />, errorElement: <Error /> },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    errorElement: <Error />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <Error />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <Error />,
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
      logoutUri="http://localhost:3000/"
      redirectUri="http://localhost:3000/"
      onRedirectCallback={(user, app_state: any) => {
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        if (app_state && app_state.type === "admin") {
          redirect("/admin");
        }
      }}
      isDangerouslyUseLocalStorage
    >
      <ApolloProvider client={client}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <HelmetProvider>
            <Toaster />
            <RouterProvider router={router} />
          </HelmetProvider>
        </ThemeProvider>
      </ApolloProvider>
    </KindeProvider>
  </React.StrictMode>
);
