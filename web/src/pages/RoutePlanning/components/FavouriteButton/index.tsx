import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Decoration } from "@/lib/types";
import { CircleNotch, Heart } from "@phosphor-icons/react";

interface Props {
  userFavourites: string[] | undefined;
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Country
    | Get_Decorations_Via_Region
    | Decoration
    | undefined;
  addDecorationToFavourites: (decorationId: string) => void;
  removeDecorationFromFavourites: (decorationId: string) => void;
  favouriteDecorationLoading: boolean;
  unFavouriteDecorationLoading: boolean;
}

export const FavouriteButton = ({
  activeDecoration,
  userFavourites,
  addDecorationToFavourites,
  removeDecorationFromFavourites,
  favouriteDecorationLoading,
  unFavouriteDecorationLoading,
}: Props) => {
  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden block">
        {activeDecoration && userFavourites?.includes(activeDecoration.id) ? (
          <Button
            variant="outline"
            className="w-full bg-zinc-800 dark:border-none hover:bg-zinc-900"
            onClick={() => removeDecorationFromFavourites(activeDecoration!.id)}
            disabled={unFavouriteDecorationLoading}
          >
            {unFavouriteDecorationLoading ? (
              <CircleNotch
                size={32}
                weight="fill"
                className="text-ch-pink animate-spin"
              />
            ) : (
              <Heart size={32} weight="fill" className="text-ch-pink" />
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full bg-zinc-800 dark:border-none hover:bg-zinc-900"
            onClick={() => addDecorationToFavourites(activeDecoration!.id)}
            disabled={favouriteDecorationLoading}
          >
            {favouriteDecorationLoading ? (
              <CircleNotch
                size={32}
                weight="bold"
                className="text-gray-400 animate-spin"
              />
            ) : (
              <Heart size={32} weight="bold" className="text-gray-400" />
            )}
          </Button>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        {activeDecoration && userFavourites?.includes(activeDecoration.id) ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-1/5 dark:bg-gray-200 dark:border-none dark:hover:bg-gray-300"
                  onClick={() =>
                    removeDecorationFromFavourites(activeDecoration!.id)
                  }
                  disabled={unFavouriteDecorationLoading}
                >
                  {unFavouriteDecorationLoading ? (
                    <CircleNotch
                      size={32}
                      weight="fill"
                      className="text-ch-pink animate-spin"
                    />
                  ) : (
                    <Heart size={32} weight="fill" className="text-ch-pink" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Remove from favourites</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-1/5 dark:bg-gray-200 dark:border-none dark:hover:bg-gray-300"
                  onClick={() =>
                    addDecorationToFavourites(activeDecoration!.id)
                  }
                  disabled={favouriteDecorationLoading}
                >
                  {favouriteDecorationLoading ? (
                    <CircleNotch
                      size={32}
                      weight="bold"
                      className="text-gray-400 animate-spin"
                    />
                  ) : (
                    <Heart size={32} weight="bold" className="text-gray-400" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Add to favourites</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </>
  );
};
