import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Decoration } from "@/lib/types";
import { MagnifyingGlass, Warning } from "@phosphor-icons/react";
import { RouteDecorationCard, DecorationsLoading } from "..";
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
  userFavourites: Decoration[] | undefined;
  setMobileMenuOpen?: (mobileMenuOpen: boolean) => void;
  selectedIcon: string;
  changeRoute: (icon: string) => void;
}

export const FavouritesNav = ({
  activeDecoration,
  isAuthenticated,
  getUserLoading,
  handleDecorationSelect,
  refs,
  userFavourites,
  setMobileMenuOpen,
  selectedIcon,
  changeRoute,
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
    <>
      {/* Mobile */}
      <div className="sm:hidden">
        <AnimatePresence>
          <motion.div
            className="fixed shadow w-full max-w-[560px] z-50 h-[70%] bottom-0 left-0 right-0 flex flex-col px-3 rounded-t-[10px] bg-slate-50 dark:bg-zinc-900 border-t dark:border-black sm:hidden"
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
          >
            <div className="flex justify-center my-2 w-screen">
              <button
                className="w-1/4 bg-zinc-700 h-3 rounded-full"
                onClick={() => setMobileMenuOpen!(false)}
              ></button>
            </div>
            <div className="px-5 dark:text-ch-light">
              <div className="my-5 flex items-center justify-between space-x-3">
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
              <DrawerNavigation
                selectedIcon={selectedIcon}
                changeRoute={changeRoute}
              />
              {getUserLoading ? (
                <DecorationsLoading />
              ) : filteredList && filteredList.length === 0 ? (
                <div className="p-5 flex justify-center items-center text-center flex-col text-primary">
                  <Warning size={32} />
                  <span className="mt-3">
                    You haven't liked any decorations yet.
                  </span>
                  <span className="text-sm">
                    Clicking the heart icon will add decoratiosn to your
                    favourites.
                  </span>
                </div>
              ) : !isAuthenticated ? (
                <div className="p-5 flex justify-center items-center text-center flex-col text-primary">
                  <Warning size={32} />
                  <span className="mt-3">
                    Create an account to like decorations.
                  </span>
                </div>
              ) : (
                <>
                  <span className="mt-5 text-sm font-semibold dark:text-zinc-500">
                    Favourites
                  </span>
                  <div className="grid grid-cols-1 rounded-lg h-[21rem] mb-5 overflow-y-auto no-scrollbar">
                    {filteredList?.map((decoration, index) => (
                      <RouteDecorationCard
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
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Desktop */}
      <aside className="hidden sm:block fixed bottom-0 left-20 top-0 w-96 overflow-y-auto border-r dark:border-black">
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
        ) : filteredList && filteredList.length === 0 ? (
          <div className="p-5 flex justify-center items-center text-center flex-col text-primary">
            <Warning size={32} />
            <span className="mt-3">You haven't liked any decorations yet.</span>
            <span className="text-sm">
              Clicking the heart icon will add decoratiosn to your favourites.
            </span>
          </div>
        ) : !isAuthenticated ? (
          <div className="p-5 flex justify-center items-center text-center flex-col text-primary">
            <Warning size={32} />
            <span className="mt-3">Create an account to like decorations.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-5 p-5 overflow-y-auto">
            {filteredList?.map((decoration, index) => (
              <RouteDecorationCard
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
            ))}
          </div>
        )}
      </aside>
    </>
  );
};
