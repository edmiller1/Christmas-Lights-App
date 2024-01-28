import { motion } from "framer-motion";
import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { CaretDown, CircleNotch, MapPin, Star, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { FavouriteButton } from "..";
import { useState } from "react";
import { Decoration, Route } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

interface Props {
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Country
    | Get_Decorations_Via_Region
    | Decoration;
  setActiveDecoration: (
    activeDecoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Decoration
      | undefined
  ) => void;
  userFavourites: string[] | undefined;
  addDecorationToFavourites: (decorationId: string) => void;
  removeDecorationFromFavourites: (decorationId: string) => void;
  favouriteDecorationLoading: boolean;
  unFavouriteDecorationLoading: boolean;
  userRoutes: Route[] | undefined;
  currentUser: User | null | undefined;
  setIsCreateRouteOpen: (isCreateRouteOpen: boolean) => void;
  addDecorationToARoute: (routeId: string, decorationId: string) => void;
  addDecorationToRouteLoading: boolean;
}

export const DecorationPopup = ({
  activeDecoration,
  setActiveDecoration,
  userFavourites,
  addDecorationToFavourites,
  removeDecorationFromFavourites,
  favouriteDecorationLoading,
  unFavouriteDecorationLoading,
  userRoutes,
  currentUser,
  setIsCreateRouteOpen,
  addDecorationToARoute,
  addDecorationToRouteLoading,
}: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [rotate, setRotate] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
      }}
      className="absolute bottom-10 right-2 w-72 rounded-xl bg-white text-black p-2"
    >
      <div className="flex items-center justify-between py-1 px-2">
        <span className="font-semibold">{activeDecoration.name}</span>
        <button
          className="p-1 rounded-full hover:bg-gray-400/40"
          onClick={() => setActiveDecoration(undefined)}
        >
          <X size={16} weight="bold" className="text-gray-600" />
        </button>
      </div>
      <img
        src={activeDecoration.images[0].url}
        alt="Christmas Decoration"
        className="rounded-2xl w-full h-48 object-cover object-center p-2"
      />
      <div className="flex flex-col space-y-3 bg-gray-100 rounded-lg p-2 mx-2">
        <div className="flex items-center text-xs space-x-2">
          <MapPin size={16} weight="fill" color="#1acd81" />
          <span className="font-semibold">
            {activeDecoration.city}, {activeDecoration.country}
          </span>
        </div>
        <div className="flex items-center text-xs space-x-2">
          <Star size={16} weight="fill" color="#1acd81" />
          <span className="font-semibold">
            {activeDecoration.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-3 mx-2 my-2">
        <FavouriteButton
          userFavourites={userFavourites}
          activeDecoration={activeDecoration}
          addDecorationToFavourites={addDecorationToFavourites}
          removeDecorationFromFavourites={removeDecorationFromFavourites}
          favouriteDecorationLoading={favouriteDecorationLoading}
          unFavouriteDecorationLoading={unFavouriteDecorationLoading}
        />

        {!currentUser ? (
          <Button
            variant="default"
            className="w-4/5 dark:bg-ch-green dark:hover:bg-ch-green-hover"
            onClick={() =>
              toast({
                variant: "default",
                title: "Not currently signed in.",
                description: "Create an account to add decorations to routes.",
                action: (
                  <ToastAction
                    altText="Sign Up"
                    onClick={() => navigate("/signin")}
                  >
                    Sign Up
                  </ToastAction>
                ),
              })
            }
          >
            Add to route
            <CaretDown
              size={16}
              weight="bold"
              color="#FFFFFF"
              className={`${
                rotate
                  ? "ml-2 rotate-180 transition-all duration-300"
                  : "ml-2 rotate-0 transition-all duration-300"
              }`}
            />
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="w-4/5 dark:bg-ch-green dark:hover:bg-ch-green-hover"
                onClick={() => setRotate(!rotate)}
              >
                {addDecorationToRouteLoading ? (
                  <CircleNotch
                    size={24}
                    weight="bold"
                    color="#FFFFFF"
                    className="animate-spin"
                  />
                ) : (
                  <>
                    Add to route
                    <CaretDown
                      size={16}
                      weight="bold"
                      color="#FFFFFF"
                      className={`${
                        rotate
                          ? "ml-2 rotate-180 transition-all duration-300"
                          : "ml-2 rotate-0 transition-all duration-300"
                      }`}
                    />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 absolute bottom-12 -right-24">
              <DropdownMenuItem onClick={() => setIsCreateRouteOpen(true)}>
                New Route
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {userRoutes?.map((route, index) => (
                <>
                  <DropdownMenuItem
                    onClick={() =>
                      addDecorationToARoute(route.id, activeDecoration.id)
                    }
                  >
                    {route.name}
                  </DropdownMenuItem>
                  {index !== userRoutes.length - 1 ? (
                    <DropdownMenuSeparator />
                  ) : null}
                </>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </motion.div>
  );
};
