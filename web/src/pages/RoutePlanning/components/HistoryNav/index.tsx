import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Decoration } from "@/lib/types";
import { FadersHorizontal, Warning } from "@phosphor-icons/react";
import { User } from "firebase/auth";
import { DecorationCard, DecorationsLoading } from "..";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";

interface Props {
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Region
    | Get_Decorations_Via_Country
    | Decoration
    | undefined;
  userHistory: Decoration[] | undefined;
  currentUser: User | null | undefined;
  getUserLoading: boolean;
  refs: any;
  handleDecorationSelect: (
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Decoration,
    index: number
  ) => void;
  userFavourites: Decoration[] | undefined;
}

export const HistoryNav = ({
  activeDecoration,
  currentUser,
  getUserLoading,
  userHistory,
  refs,
  handleDecorationSelect,
  userFavourites,
}: Props) => {
  return (
    <aside className="fixed bottom-0 left-20 top-0 w-96 overflow-y-auto border-r dark:border-black">
      <div className="bg-zinc-800 p-8 dark:border-b dark:border-black">
        <h1 className="text-xl font-semibold">History</h1>
        <div className="flex items-center space-x-4 my-5">
          <Input type="text" placeholder="Search History" />
          <Button variant="outline">
            <FadersHorizontal
              size={16}
              weight="bold"
              className="text-ch-dark dark:text-ch-light"
            />
          </Button>
        </div>
      </div>
      {getUserLoading ? (
        <DecorationsLoading />
      ) : userHistory && userHistory.length === 0 ? (
        <div className="p-5 flex justify-center items-center text-center flex-col text-ch-red">
          <Warning size={32} />
          <span className="mt-3">
            Could not find any decorations in your history.
          </span>
          <span className="text-sm">
            Visiting decorations will add them to your history.
          </span>
        </div>
      ) : !currentUser ? (
        <div className="p-5 flex justify-center items-center text-center flex-col text-ch-red">
          <Warning size={32} />
          <span className="mt-3">
            Create an account to have decorations added to your history.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-5 p-5 overflow-y-auto">
          {userHistory?.map((decoration, index) => (
            <>
              <DecorationCard
                activeDecoration={activeDecoration}
                decoration={decoration}
                handleDecorationSelect={handleDecorationSelect}
                index={index}
                refs={refs}
                userFavourites={userFavourites?.map(
                  (favourite) => favourite.id
                )}
              />
            </>
          ))}
        </div>
      )}
    </aside>
  );
};
