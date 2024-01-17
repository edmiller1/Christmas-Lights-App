import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Decoration } from "@/lib/types";
import { Heart, Star } from "@phosphor-icons/react";

interface Props {
  decoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Region
    | Get_Decorations_Via_Country;
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Region
    | Get_Decorations_Via_Country
    | undefined;
  setActiveDecoration: (
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Region
      | Get_Decorations_Via_Country
      | undefined
  ) => void;
  activeDecorationIndex: number;
  setActiveDecorationIndex: (activeDecorationIndex: number) => void;
  index: number;
  handleDecorationSelect: (
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region,
    index: number
  ) => void;
  refs: any;
  userFavourites: string[] | undefined;
}

export const DecorationCard = ({
  decoration,
  activeDecoration,
  activeDecorationIndex,
  setActiveDecoration,
  setActiveDecorationIndex,
  index,
  handleDecorationSelect,
  refs,
  userFavourites,
}: Props) => {
  return (
    <div
      ref={refs[decoration.id]}
      className={`${
        activeDecoration?.id === decoration.id
          ? "flex rounded-lg h-28 cursor-pointer dark:bg-ch-green transition-all"
          : "flex rounded-lg h-28 cursor-pointer dark:bg-zinc-800 hover:dark:bg-zinc-700 transition-all"
      }`}
      onClick={() => handleDecorationSelect(decoration, index)}
    >
      <div className="w-1/3">
        <img
          src={decoration.images[0].url}
          alt="Christmas Decoration"
          className="rounded-xl p-2 object-cover object-center h-28 w-28"
        />
      </div>
      <div className="w-2/3">
        <div className="flex flex-col">
          <span className="font-semibold pt-2">{decoration.name}</span>
          <span
            className={`${
              activeDecoration?.id === decoration.id
                ? "text-xs dark:text-white"
                : "text-xs dark:text-zinc-400"
            }`}
          >
            {decoration.city}, {decoration.country}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-start justify-end px-3 py-2">
          {userFavourites?.includes(decoration.id) ? (
            <Heart size={16} weight="fill" className="text-ch-pink" />
          ) : (
            <Heart
              size={16}
              weight="bold"
              className="text-ch-dark dark:text-ch-light"
            />
          )}
        </div>
        <div className="flex items-end justify-end text-xs space-x-2 px-3 py-2">
          <Star
            size={16}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
          <span>{decoration.rating}</span>
        </div>
      </div>
    </div>
  );
};
