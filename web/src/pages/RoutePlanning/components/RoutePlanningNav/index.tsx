import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CaretLeft, Heart, MapPin, MapTrifold } from "@phosphor-icons/react";
import { ClockCounterClockwise } from "@phosphor-icons/react/dist/ssr/ClockCounterClockwise";
import { useNavigate } from "react-router-dom";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  selectedIcon: string;
  changeRoute: (icon: string) => void;
}

export const RoutePlanningNav = ({ changeRoute, selectedIcon }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed inset-y-0 left-0 z-50 w-20 overflow-y-auto border-r dark:border-black pb-4">
        <div className="flex h-16 shrink-0 items-center justify-center">
          <button onClick={() => navigate(-1)}>
            <CaretLeft
              size={32}
              weight="bold"
              className="text-ch-dark dark:text-ch-light"
            />
          </button>
        </div>
        <nav className="mt-8">
          <ul role="list" className="flex flex-col items-center space-y-10">
            <li className="cursor-pointer" onClick={() => changeRoute("map")}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={classNames(
                        selectedIcon === "map"
                          ? "bg-ch-red text-white"
                          : "text-gray-400 dark:hover:text-white dark:hover:bg-zinc-800",
                        "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                      )}
                    >
                      <MapTrifold size={24} weight="bold" />
                      <span className="sr-only">Map</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Map</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => changeRoute("route-planning")}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={classNames(
                        selectedIcon === "route-planning"
                          ? "bg-ch-red text-white"
                          : "text-gray-400 dark:hover:text-white dark:hover:bg-zinc-800",
                        "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                      )}
                    >
                      <MapPin size={24} weight="bold" />
                      <span className="sr-only">Route Planning</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Route Planning</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => changeRoute("favourites")}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={classNames(
                        selectedIcon === "favourites"
                          ? "bg-ch-red text-white"
                          : "text-gray-400 dark:hover:text-white dark:hover:bg-zinc-800",
                        "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                      )}
                    >
                      <Heart size={24} weight="bold" />
                      <span className="sr-only">Favourites</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Favourites</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => changeRoute("history")}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={classNames(
                        selectedIcon === "history"
                          ? "bg-ch-red text-white"
                          : "text-gray-400 dark:hover:text-white dark:hover:bg-zinc-800",
                        "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                      )}
                    >
                      <ClockCounterClockwise size={24} weight="bold" />
                      <span className="sr-only">History</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>History</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
