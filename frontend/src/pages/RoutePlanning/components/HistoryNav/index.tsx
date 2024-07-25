import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Decoration } from "@/lib/types";
import { MagnifyingGlass, Warning } from "@phosphor-icons/react";
import { RouteDecorationCard, DecorationsLoading } from "..";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Search_User_Favourites } from "@/graphql/queries/searchUserFavourites/types";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DrawerNavigation } from "../DrawerNavigation";

interface Props {
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Region
    | Get_Decorations_Via_Country
    | Decoration
    | undefined;
  userHistory: Decoration[] | undefined;
  isAuthenticated: boolean;
  getUserLoading: boolean;
  refs: any;
  handleDecorationSelect: (
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Decoration
  ) => void;
  userFavourites: Decoration[] | Search_User_Favourites[] | undefined;
  setMobileMenuOpen?: (mobileMenuOpen: boolean) => void;
  selectedIcon: string;
  changeRoute: (icon: string) => void;
}

export const HistoryNav = ({
  activeDecoration,
  isAuthenticated,
  getUserLoading,
  userHistory,
  refs,
  handleDecorationSelect,
  userFavourites,
  selectedIcon,
  changeRoute,
  setMobileMenuOpen,
}: Props) => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [filteredList, setFilteredList] = useState<Decoration[] | undefined>(
    userHistory
  );

  const handleSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const filterUserHistory = () => {
    const filteredData = userHistory?.filter((decoration) =>
      Object.values(decoration).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchWord.toLowerCase())
      )
    );
    setFilteredList(filteredData);
  };
  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden">
        <AnimatePresence>
          <motion.div
            className="fixed shadow w-full max-w-[560px] z-50 h-[70%] bottom-0 left-0 right-0 flex flex-col px-3 rounded-t-[10px] bg-background dark:bg-zinc-900 border-t dark:border-black sm:hidden"
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
          >
            <div className="flex justify-center w-screen my-2">
              <button
                className="w-1/4 h-3 rounded-full bg-zinc-700"
                onClick={() => setMobileMenuOpen!(false)}
              ></button>
            </div>
            <div className="px-5 dark:text-ch-light">
              <div className="flex items-center justify-between my-5 space-x-3">
                <Input
                  type="text"
                  placeholder="Search History"
                  value={searchWord}
                  onChange={(e) => handleSearchWord(e)}
                />
                <Button variant="outline" onClick={filterUserHistory}>
                  <MagnifyingGlass
                    size={16}
                    weight="bold"
                    className="text-ch-dark dark:text-ch-light"
                  />
                </Button>
              </div>
              <DrawerNavigation
                selectedIcon={selectedIcon}
                changeRoute={changeRoute}
              />
              {getUserLoading ? (
                <DecorationsLoading />
              ) : filteredList && filteredList.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-5 text-center text-primary">
                  <Warning size={32} />
                  <span className="mt-3">
                    Could not find any decorations in your history.
                  </span>
                  <span className="text-sm">
                    Visiting decorations will add them to your history.
                  </span>
                </div>
              ) : !isAuthenticated ? (
                <div className="flex flex-col items-center justify-center p-5 text-center text-primary">
                  <Warning size={32} />
                  <span className="mt-3">
                    Create an account to have decorations added to your history.
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-1 rounded-lg h-[21rem] mb-5 overflow-y-auto no-scrollbar">
                  {filteredList?.map((decoration, index) => (
                    <>
                      <RouteDecorationCard
                        key={decoration.id}
                        activeDecoration={activeDecoration}
                        decoration={decoration}
                        handleDecorationSelect={handleDecorationSelect}
                        index={index}
                        refs={refs}
                        userFavourites={userFavourites?.map(
                          (favourite) => favourite.id
                        )}
                        decorations={filteredList}
                      />
                    </>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Desktop */}
      <aside className="fixed top-0 bottom-0 hidden overflow-y-auto border-r sm:block left-20 w-96 dark:border-black">
        <div className="p-8 border-b dark:border-black">
          <h1 className="text-xl font-semibold">History</h1>
          <div className="flex items-center my-5 space-x-4">
            <Input
              type="text"
              placeholder="Search History"
              value={searchWord}
              onChange={(e) => handleSearchWord(e)}
            />
            <Button
              disabled={!searchWord}
              variant="outline"
              onClick={filterUserHistory}
            >
              <MagnifyingGlass size={16} weight="bold" />
            </Button>
          </div>
        </div>
        {getUserLoading ? (
          <DecorationsLoading />
        ) : filteredList && filteredList.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-5 text-center text-primary">
            <Warning size={32} />
            <span className="mt-3">
              Could not find any decorations in your history.
            </span>
            <span className="text-sm">
              Visiting decorations will add them to your history.
            </span>
          </div>
        ) : !isAuthenticated ? (
          <div className="flex flex-col items-center justify-center p-5 text-center text-primary">
            <Warning size={32} />
            <span className="mt-3">
              Create an account to have decorations added to your history.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 p-5 overflow-y-auto gap-y-5">
            {filteredList?.map((decoration, index) => (
              <>
                <RouteDecorationCard
                  key={decoration.id}
                  activeDecoration={activeDecoration}
                  decoration={decoration}
                  handleDecorationSelect={handleDecorationSelect}
                  index={index}
                  refs={refs}
                  userFavourites={userFavourites?.map(
                    (favourite) => favourite.id
                  )}
                  decorations={filteredList}
                />
              </>
            ))}
          </div>
        )}
      </aside>
    </>
  );
};
