import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
    | Decoration
    | undefined;
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
  showActiveDecoration: boolean;
  setShowActiveDecoration: (showActiveDecoreation: boolean) => void;
}

export const MobileDecorationPopup = ({
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
  setShowActiveDecoration,
  showActiveDecoration,
}: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [rotate, setRotate] = useState<boolean>(false);
  return (
    <div className="sm:hidden">
      <Transition appear show={showActiveDecoration} as={Fragment}>
        <Dialog
          as="div"
          className="sm:hidden relative z-50"
          onClose={() => setShowActiveDecoration(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="sm:hidden fixed inset-0 bg-black bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900">
                  <div className="flex items-center justify-between py-1 px-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                    >
                      {activeDecoration?.name}
                    </Dialog.Title>
                    <button
                      className="p-1 rounded-full hover:bg-gray-400/40"
                      onClick={() => setActiveDecoration(undefined)}
                    >
                      <X
                        size={16}
                        weight="bold"
                        className="text-gray-600 dark:text-ch-light"
                      />
                    </button>
                  </div>
                  <img
                    src={activeDecoration?.images[0].url}
                    alt="Christmas Decoration"
                    className="rounded-2xl w-full h-64 object-cover object-center p-2"
                  />
                  <div className="flex flex-col space-y-3 bg-gray-100 rounded-lg p-2 mx-2 dark:text-ch-light dark:bg-zinc-800">
                    <div className="flex items-center text-sm space-x-2">
                      <MapPin size={20} weight="fill" color="#1acd81" />
                      <span className="font-semibold">
                        {activeDecoration?.city}, {activeDecoration?.country}
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <Star size={20} weight="fill" color="#1acd81" />
                      <span className="font-semibold">
                        {activeDecoration?.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mx-2 my-2">
                    <FavouriteButton
                      userFavourites={userFavourites}
                      activeDecoration={activeDecoration}
                      addDecorationToFavourites={addDecorationToFavourites}
                      removeDecorationFromFavourites={
                        removeDecorationFromFavourites
                      }
                      favouriteDecorationLoading={favouriteDecorationLoading}
                      unFavouriteDecorationLoading={
                        unFavouriteDecorationLoading
                      }
                    />
                    {!currentUser ? (
                      <Button
                        variant="default"
                        className="w-4/5 dark:bg-ch-green dark:hover:bg-ch-green-hover"
                        onClick={() =>
                          toast({
                            variant: "default",
                            title: "Not currently signed in.",
                            description:
                              "Create an account to add decorations to routes.",
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
                            onClick={() => {
                              setRotate(!rotate);
                              setShowActiveDecoration(true);
                            }}
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
                          <DropdownMenuItem
                            onClick={() => setIsCreateRouteOpen(true)}
                          >
                            New Route
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {userRoutes?.map((route, index) => (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  addDecorationToARoute(
                                    route.id,
                                    activeDecoration!.id
                                  )
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
