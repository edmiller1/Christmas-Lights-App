import { Decoration, Route } from "@/lib/types";
import { DotsSixVertical } from "@phosphor-icons/react";

interface Props {
  index: number;
  decoration: Decoration;
  openRemoveDecorationModal: (decorationId: string, routeId: string) => void;
  selectedRoute: Route;
  handleSortRoute: () => void;
  dragDecoration: React.MutableRefObject<number>;
  draggedOverDecoration: React.MutableRefObject<number>;
}

export const RouteCard = ({
  index,
  decoration,
  openRemoveDecorationModal,
  selectedRoute,
  handleSortRoute,
  dragDecoration,
  draggedOverDecoration,
}: Props) => {
  return (
    <>
      <div
        className="flex rounded-lg h-20 border cursor-grab dark:bg-zinc-800 dark:border-zinc-500"
        draggable
        onDragStart={() => (dragDecoration.current = index)}
        onDragEnter={() => (draggedOverDecoration.current = index)}
        onDragEnd={handleSortRoute}
        onDragOver={(e) => e.preventDefault()}
      >
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
            className="text-xs text-primary cursor-pointer hover:underline"
            onClick={() =>
              openRemoveDecorationModal(decoration.id, selectedRoute.id)
            }
          >
            Remove
          </button>
        </div>
        <div className="flex justify-center items-center pr-5">
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
