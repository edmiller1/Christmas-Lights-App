import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Decoration, Route } from "@/lib/types";
import { Plus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { RoutesLoading } from "./components";
import { User } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { RouteCard } from "..";

interface Props {
  userRoutes: Route[] | undefined;
  getUserLoading: boolean;
  currentUser: User | null | undefined;
  setIsCreateRouteOpen: (isCreateRouteOpen: boolean) => void;
  userFavourites: Decoration[] | undefined;
}

export const RoutesNav = ({
  currentUser,
  getUserLoading,
  userRoutes,
  setIsCreateRouteOpen,
  userFavourites,
}: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route);
  };

  const addRoute = () => {
    if (!currentUser) {
      toast({
        variant: "default",
        title: "Not currently signed in.",
        description: "Create an account to create new routes",
        action: (
          <ToastAction altText="Sign Up" onClick={() => navigate("/signin")}>
            Sign Up
          </ToastAction>
        ),
      });
    } else {
      setIsCreateRouteOpen(true);
    }
  };

  if (getUserLoading) {
    return <RoutesLoading />;
  }

  return (
    <aside className="fixed bottom-0 left-20 top-0 w-96 overflow-y-auto border-r dark:border-black">
      <div className="bg-zinc-800 p-8 dark:border-b dark:border-black">
        <h1 className="text-xl font-semibold">Routes</h1>
        <div className="grid grid-cols-4 gap-x-4 gap-y-5 my-5">
          {userRoutes &&
            userRoutes.map((route) => (
              <TooltipProvider key={route.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className={`${
                        selectedRoute && selectedRoute.id === route.id
                          ? "border cursor-pointer dark:bg-zinc-900 dark:border-black dark:hover:bg-zinc-900/70 ring-2 ring-ch-green"
                          : "border cursor-pointer dark:bg-zinc-900 dark:border-black dark:hover:bg-zinc-900/70"
                      }`}
                      onClick={() => handleSelectRoute(route)}
                    >
                      {route.decorations.length > 0 ? (
                        <img
                          src={route.decorations[0].images[0].url}
                          alt="Cristmas Decoration"
                          className="rounded-xl object-cover object-center"
                        />
                      ) : (
                        <span className="flex items-center justify-center text-xl">
                          {route.name[0].toUpperCase()}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{route.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <Button
                variant="outline"
                className="w-full border-dashed dark:bg-zinc-900 dark:border-black dark:hover:bg-zinc-900/70"
                onClick={addRoute}
              >
                <Plus
                  size={24}
                  weight="bold"
                  className="m-auto text-ch-dark dark:text-ch-light"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new route</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        {selectedRoute && selectedRoute.decorations.length === 0 ? (
          <div className="p-5 flex justify-center items-center text-center flex-col text-ch-red">
            <span className="mt-3 text-lg">This route has no decorations.</span>
            <span>
              Add decorations to get started with planning your route.
            </span>
          </div>
        ) : selectedRoute ? (
          <>
            {selectedRoute.decorations.map((decoration) => (
              <div className="p-5">
                <RouteCard
                  decoration={decoration}
                  userFavourites={userFavourites?.map(
                    (decoration) => decoration.id
                  )}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="p-5 flex justify-center items-center text-center flex-col text-ch-red">
            <span className="mt-3 text-lg">No route selected.</span>
            <span>Select a route to get started.</span>
          </div>
        )}
      </div>
    </aside>
  );
};
