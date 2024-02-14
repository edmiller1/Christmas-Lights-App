import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Decoration } from "@/lib/types";
import {
  FadersHorizontal,
  MagnifyingGlass,
  Warning,
} from "@phosphor-icons/react";
import { User } from "firebase/auth";
import { DecorationCard, DecorationsLoading } from "..";
import { Search_User_Favourites } from "@/graphql/queries/searchUserFavourites/types";
import { useState } from "react";

interface Props {
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Region
    | Get_Decorations_Via_Country
    | Decoration
    | undefined;
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

export const FavouritesNav = ({
  activeDecoration,
  currentUser,
  getUserLoading,
  handleDecorationSelect,
  refs,
  userFavourites,
}: Props) => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [filteredList, setFilteredList] = useState<Decoration[] | undefined>(
    userFavourites
  );

  const handleSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const filterUserFavourites = () => {
    const filteredData = userFavourites?.filter((favourite) =>
      Object.values(favourite).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchWord.toLowerCase())
      )
    );
    setFilteredList(filteredData);
  };

  return (
    <aside className="fixed bottom-0 left-20 top-0 w-96 overflow-y-auto border-r dark:border-black">
      <div className="bg-zinc-800 p-8 dark:border-b dark:border-black">
        <h1 className="text-xl font-semibold">Favourites</h1>
        <div className="flex items-center space-x-4 my-5">
          <Input
            type="text"
            placeholder="Search Favourites"
            value={searchWord}
            onChange={(e) => handleSearchWord(e)}
          />
          <Button variant="outline" onClick={filterUserFavourites}>
            <MagnifyingGlass
              size={16}
              weight="bold"
              className="text-ch-dark dark:text-ch-light"
            />
          </Button>
        </div>
      </div>
      {getUserLoading ? (
        <DecorationsLoading />
      ) : userFavourites && userFavourites.length === 0 ? (
        <div className="p-5 flex justify-center items-center text-center flex-col text-ch-red">
          <Warning size={32} />
          <span className="mt-3">You haven't liked any decorations yet.</span>
          <span className="text-sm">
            Clicking the heart icon will add decoratiosn to your favourites.
          </span>
        </div>
      ) : !currentUser ? (
        <div className="p-5 flex justify-center items-center text-center flex-col text-ch-red">
          <Warning size={32} />
          <span className="mt-3">Create an account to like decorations.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-5 p-5 overflow-y-auto">
          {filteredList?.map((decoration, index) => (
            <DecorationCard
              activeDecoration={activeDecoration}
              decoration={decoration}
              handleDecorationSelect={handleDecorationSelect}
              index={index}
              refs={refs}
              userFavourites={userFavourites?.map((favourite) => favourite.id)}
            />
          ))}
        </div>
      )}
    </aside>
  );
};
