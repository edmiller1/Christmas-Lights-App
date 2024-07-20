import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_DECORATION_FROM_HISTORY } from "@/graphql/mutations";
import {
  RemoveDecorationFromHistory as RemoveDecorationfromHistoryData,
  removeDecorationFromHistoryArgs,
} from "@/graphql/mutations/removeDecorationFromHistory/types";
import { CircleNotch, DotsThreeVertical, Star } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Decoration } from "@/lib/types";
import { Link } from "react-router-dom";

interface Props {
  decoration: Decoration;
  decorations: Decoration[];
  index: number;
  refetchHistory: () => void;
}

export const HistoryDecorationCard = ({
  decoration,
  decorations,
  index,
  refetchHistory,
}: Props) => {
  const { toast } = useToast();

  const [currentDecorationIndex, setCurrentDecorationIndex] =
    useState<number>(0);

  const [
    removeDecorationFromHistory,
    { loading: removeDecorationFromHistoryLoading },
  ] = useMutation<
    RemoveDecorationfromHistoryData,
    removeDecorationFromHistoryArgs
  >(REMOVE_DECORATION_FROM_HISTORY, {
    onCompleted: () => {
      refetchHistory();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error 😬",
        description:
          "Failed to remove decoration from history. Please try again.",
      });
    },
  });

  const minusOneHistory = (decorationId: string) => {
    const decorationIndex = decorations.findIndex(
      (decoration) => decoration.id === decorationId
    );
    setCurrentDecorationIndex(decorationIndex);
    removeDecorationFromHistory({ variables: { input: { id: decorationId } } });
  };
  return (
    <>
      {/* Mobile */}
      <div className="group sm:hidden">
        {removeDecorationFromHistoryLoading &&
        currentDecorationIndex === index ? (
          <div className="relative w-full overflow-hidden bg-gray-200 rounded-lg">
            <div className="absolute z-50 flex flex-col items-center justify-center w-full h-full space-y-3 rounded-xl bg-black/90">
              <CircleNotch size={52} weight="bold" className="animate-spin" />
              <span className="font-semibold">Removing decoration...</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  disabled
                  className="absolute p-1 rounded-full right-2 top-2 bg-black/50"
                >
                  <DotsThreeVertical
                    size={32}
                    weight="bold"
                    className="text-ch-light"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-10">
                <DropdownMenuItem>Remove from History</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to={`/decoration/${decoration.id}`} key={decoration.id}>
              <img
                src={decoration.images[0].url}
                alt="decoration image"
                className="object-cover object-center w-full h-80"
              />
            </Link>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden bg-gray-200 rounded-lg">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="absolute p-1 rounded-full right-2 top-2 bg-black/50">
                  <DotsThreeVertical
                    size={24}
                    weight="bold"
                    className="text-ch-light"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-10">
                <DropdownMenuItem
                  onClick={() => minusOneHistory(decoration.id)}
                >
                  Remove from History
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to={`/decoration/${decoration.id}`} key={decoration.id}>
              <img
                src={decoration.images[0].url}
                alt="decoration image"
                className="object-cover object-center w-full h-80"
              />
            </Link>
          </div>
        )}
        <Link to={`/decoration/${decoration.id}`} key={decoration.id}>
          <div className="flex items-center justify-between">
            <h3 className="mt-1 font-bold">{decoration.name}</h3>
            <div className="flex items-center mt-1 space-x-1">
              <Star size={16} className="text-ch-dark dark:text-ch-light" />
              <span>{decoration.rating}</span>
            </div>
          </div>
          <p className="text-sm">
            {decoration.city}, {decoration.country}
          </p>
        </Link>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block sm:group">
        {removeDecorationFromHistoryLoading &&
        currentDecorationIndex === index ? (
          <div className="relative w-64 overflow-hidden bg-gray-200 rounded-lg">
            <div className="absolute z-50 flex flex-col items-center justify-center w-full h-full space-y-3 rounded-xl bg-black/90">
              <CircleNotch size={52} weight="bold" className="animate-spin" />
              <span className="font-semibold">Removing decoration...</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  disabled
                  className="absolute p-1 rounded-full right-2 top-2 bg-black/50"
                >
                  <DotsThreeVertical
                    size={32}
                    weight="bold"
                    className="text-ch-light"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-10">
                <DropdownMenuItem>Remove from History</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to={`/decoration/${decoration.id}`} key={decoration.id}>
              <img
                src={decoration.images[0].url}
                alt="decoration image"
                className="object-cover object-center w-64 h-64"
              />
            </Link>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden bg-gray-200 rounded-lg">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="absolute p-1 rounded-full right-2 top-2 bg-black/50">
                  <DotsThreeVertical
                    size={32}
                    weight="bold"
                    className="text-ch-light"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-10">
                <DropdownMenuItem
                  onClick={() => minusOneHistory(decoration.id)}
                >
                  Remove from History
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to={`/decoration/${decoration.id}`} key={decoration.id}>
              <img
                src={decoration.images[0].url}
                alt="decoration image"
                className="object-cover object-center w-full h-64"
              />
            </Link>
          </div>
        )}
        <Link to={`/decoration/${decoration.id}`}>
          <div className="flex items-center justify-between">
            <h3 className="mt-4 font-bold">{decoration.name}</h3>
            <div className="flex items-center mt-3 space-x-1">
              <Star
                size={16}
                weight="fill"
                className="text-ch-dark dark:text-ch-light"
              />
              <span className="">{decoration.rating}</span>
            </div>
          </div>
          <p className="mt-1 text-sm">
            {decoration.city}, {decoration.country}
          </p>
        </Link>
      </div>
    </>
  );
};
