import {
  ClockCounterClockwise,
  Heart,
  MapPin,
  MapTrifold,
} from "@phosphor-icons/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  changeRoute: (icon: string) => void;
  selectedIcon: string;
}

export const DrawerNavigation = ({ changeRoute, selectedIcon }: Props) => {
  return (
    <>
      <span className="text-sm font-semibold dark:text-zinc-500">
        Navigation
      </span>
      <div className="p-3 mb-5 flex items-center justify-between rounded-xl dark:bg-zinc-800">
        <button
          className="flex flex-col items-center space-y-1"
          onClick={() => changeRoute("map")}
        >
          <div
            className={classNames(
              selectedIcon === "map" ? "bg-ch-red text-white" : "",
              "rounded-full p-3 text-sm"
            )}
          >
            <MapTrifold size={32} weight="bold" />
          </div>
          <span className="text-lg">Map</span>
        </button>
        <button
          className="flex flex-col items-center space-y-1"
          onClick={() => changeRoute("route-planning")}
        >
          <div
            className={classNames(
              selectedIcon === "route-planning" ? "bg-ch-red text-white" : "",
              "rounded-full p-3 text-sm"
            )}
          >
            <MapPin size={32} weight="bold" />
          </div>
          <span className="text-lg">Routes</span>
        </button>
        <button
          className="flex flex-col items-center space-y-1"
          onClick={() => changeRoute("favourites")}
        >
          <div
            className={classNames(
              selectedIcon === "favourites" ? "bg-ch-red text-white" : "",
              "rounded-full p-3 text-sm"
            )}
          >
            <Heart size={32} weight="bold" />
          </div>
          <span className="text-lg">Favourites</span>
        </button>
        <button
          className="flex flex-col items-center space-y-1"
          onClick={() => changeRoute("history")}
        >
          <div
            className={classNames(
              selectedIcon === "history" ? "bg-ch-red text-white" : "",
              "rounded-full p-3 text-sm"
            )}
          >
            <ClockCounterClockwise size={32} weight="bold" />
          </div>
          <span className="text-lg">History</span>
        </button>
      </div>
    </>
  );
};
