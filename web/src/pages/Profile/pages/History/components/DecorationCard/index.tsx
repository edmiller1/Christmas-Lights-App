import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_DECORATION_FROM_HISTORY } from "@/graphql/mutations";
import {
  RemoveDecorationFromHistory as RemoveDecorationfromHistoryData,
  removeDecorationFromHistoryArgs,
} from "@/graphql/mutations/removeDecorationFromHistory/types";
import {
  CaretLeft,
  CircleNotch,
  DotsThreeVertical,
  Star,
} from "@phosphor-icons/react";
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
  refetchUserData: () => void;
}

export const DecorationCard = ({
  decoration,
  decorations,
  index,
  refetchUserData,
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
      refetchUserData();
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
          <div className="w-full overflow-hidden rounded-lg bg-gray-200 relative">
            <div className="w-full h-full rounded-xl bg-black/90 absolute z-50 space-y-3 flex flex-col justify-center items-center">
              <CircleNotch size={52} weight="bold" className="animate-spin" />
              <span className="font-semibold">Removing decoration...</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  disabled
                  className="absolute right-2 top-2 bg-black/50 rounded-full p-1"
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
                className="h-80 w-full object-cover object-center"
              />
            </Link>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-lg bg-gray-200 relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="absolute right-2 top-2 bg-black/50 rounded-full p-1">
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
                className="h-80 w-full object-cover object-center"
              />
            </Link>
          </div>
        )}

        <Link to={`/decoration/${decoration.id}`} key={decoration.id}>
          <div className="flex items-center justify-between">
            <h3 className="mt-4 text-lg font-bold">{decoration.name}</h3>
            <div className="flex items-center space-x-1 mt-3">
              <Star
                size={20}
                weight="fill"
                className="text-ch-dark dark:text-ch-light"
              />
              <span className="text-lg">{decoration.rating}</span>
            </div>
          </div>
          <p className="mt-1">
            {decoration.city}, {decoration.country}
          </p>
        </Link>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block sm:group">
        {removeDecorationFromHistoryLoading &&
        currentDecorationIndex === index ? (
          <div className="w-full overflow-hidden rounded-lg bg-gray-200 relative">
            <div className="w-full h-full rounded-xl bg-black/90 absolute z-50 space-y-3 flex flex-col justify-center items-center">
              <CircleNotch size={52} weight="bold" className="animate-spin" />
              <span className="font-semibold">Removing decoration...</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  disabled
                  className="absolute right-2 top-2 bg-black/50 rounded-full p-1"
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
                className="h-64 w-full object-cover object-center"
              />
            </Link>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-lg bg-gray-200 relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="absolute right-2 top-2 bg-black/50 rounded-full p-1">
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
                className="h-64 w-full object-cover object-center"
              />
            </Link>
          </div>
        )}
        <Link to={`/decoration/${decoration.id}`}>
          <div className="flex items-center justify-between">
            <h3 className="mt-4 font-bold">{decoration.name}</h3>
            <div className="flex items-center space-x-1 mt-3">
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
