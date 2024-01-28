import { Decoration, Route } from "@/lib/types";
import { DotsSixVertical, Heart, Star } from "@phosphor-icons/react";

interface Props {
  decoration: Decoration;
  userFavourites: string[] | undefined;
  openRemoveDecorationModal: (decorationId: string, routeId: string) => void;
  selectedRoute: Route;
}

export const RouteCard = ({
  decoration,
  userFavourites,
  openRemoveDecorationModal,
  selectedRoute,
}: Props) => {
  return (
    <>
      <div className="flex rounded-lg h-20 border dark:bg-zinc-800 dark:border-zinc-500">
        <div className="w-1/3">
          <img
            src={decoration.images[0].url}
            alt="Christmas Decoration"
            className="rounded-xl p-2 object-cover object-center h-20 w-20"
          />
        </div>
        <div className="w-2/3">
          <div className="flex flex-col">
            <span className="font-semibold pt-2">{decoration.name}</span>
            <span className="text-xs dark:text-zinc-400">
              {decoration.city}, {decoration.country}
            </span>
          </div>
          <button
            className="text-xs text-ch-red cursor-pointer hover:underline"
            onClick={() =>
              openRemoveDecorationModal(decoration.id, selectedRoute.id)
            }
          >
            Remove
          </button>
        </div>
        <div className="flex justify-center items-center pr-5 cursor-grab">
          <DotsSixVertical
            size={20}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
        </div>
      </div>
    </>
  );
};
