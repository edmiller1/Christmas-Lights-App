import React from "react";
import ReactDOM from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import KindeApolloProvider from "./lib/kinde.tsx";
import "./index.css";
import {
  Admin,
  CancelSession,
  Decoration,
  Error,
  Home,
  NotFound,
  Notifications,
  Premium,
  PrivacyPolicy,
  Profile,
  RoutePlanning,
  Search,
  SignIn,
  SiteMap,
  Terms,
  VerifyDecoration,
} from "./pages";
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
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/premium",
    element: <Premium />,
  },
  {
    path: "/cancel-session",
    element: <CancelSession />,
  },
  {
    path: "/Search",
    element: <Search />,
    errorElement: <Error />,
  },
  { path: "/signin", element: <SignIn />, errorElement: <Error /> },
  {
    path: "/decoration/:decorationId",
    element: <Decoration />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
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
      {
        path: "/profile/history",
        element: <History />,
        errorElement: <Error />,
      },
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
        path: "/verify-decoration/:decorationId",
        element: <VerifyDecoration />,
        errorElement: <Error />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
        errorElement: <Error />,
      },
    ],
  },
  { path: "/sitemap", element: <SiteMap />, errorElement: <Error /> },
  { path: "/terms", element: <Terms />, errorElement: <Error /> },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={import.meta.env.VITE_KINDE_DOMAIN}
      logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URL}
      redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URL}
    >
      <KindeApolloProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <HelmetProvider>
            <Toaster />
            <RouterProvider router={router} />
          </HelmetProvider>
        </ThemeProvider>
      </KindeApolloProvider>
    </KindeProvider>
  </React.StrictMode>
);
