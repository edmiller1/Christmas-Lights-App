import { Decoration } from "@/lib/types";
import { DotsSixVertical, Heart, Star } from "@phosphor-icons/react";

interface Props {
  decoration: Decoration;
  userFavourites: string[] | undefined;
}

export const RouteCard = ({ decoration, userFavourites }: Props) => {
  return (
    <>
      <div className="flex rounded-lg h-20 dark:bg-zinc-800">
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
          <span className="text-xs text-ch-red cursor-pointer hover:underline">
            Remove
          </span>
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
