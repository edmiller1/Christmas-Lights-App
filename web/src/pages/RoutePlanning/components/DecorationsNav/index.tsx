import { MagnifyingGlass, Warning } from "@phosphor-icons/react";
import { DecorationCard, DecorationsLoading } from "..";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Decoration } from "@/lib/types";
import { Get_Decorations_Via_Search } from "@/graphql/queries/getDecorationsViaSearch/types";
import { Search_User_Favourites } from "@/graphql/queries/searchUserFavourites/types";
import { AnimatePresence, motion } from "framer-motion";
import { DrawerNavigation } from "../DrawerNavigation";
import { Pagi } from "@/pages/Search/components";

interface Props {
  getDecorationsViaCountryLoading: boolean;
  getDecorationsViaCityLoading: boolean;
  getDecorationsViaRegionLoading: boolean;
  searchForDecorationsLoading: boolean;
  decorations:
    | Get_Decorations_Via_City[]
    | Get_Decorations_Via_Country[]
    | Get_Decorations_Via_Region[]
    | Get_Decorations_Via_Search[]
    | null;
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Country
    | Get_Decorations_Via_Region
    | Decoration
    | undefined;
  refs: any;
  userFavourites: Decoration[] | Search_User_Favourites[] | undefined;
  handleDecorationSelect: (
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Decoration,
    index: number
  ) => void;
  searchDecorations: (searchTerm: string) => void;
  selectedIcon: string;
  changeRoute: (icon: string) => void;
  setMobileMenuOpen?: (mobileMenuOpen: boolean) => void;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const DecorationsNav = ({
  getDecorationsViaCityLoading,
  getDecorationsViaCountryLoading,
  getDecorationsViaRegionLoading,
  searchForDecorationsLoading,
  decorations,
  activeDecoration,
  handleDecorationSelect,
  refs,
  userFavourites,
  searchDecorations,
  selectedIcon,
  changeRoute,
  setMobileMenuOpen,
  nextPage,
  pageNumber,
  previousPage,
  setPageNumber,
  totalPages,
  searchTerm,
  setSearchTerm,
}: Props) => {
  const handleSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm) {
      searchDecorations(searchTerm);
    }
  };
  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden">
        <AnimatePresence>
          <motion.div
            className="fixed shadow w-full max-w-[560px] z-50 h-[75%] bottom-0 left-0 right-0 flex flex-col px-3 rounded-t-[10px] bg-slate-50 dark:bg-zinc-900 border-t dark:border-black sm:hidden"
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
                  placeholder="Search Decorations"
                  value={searchTerm}
                  onChange={(e) => handleSearchWord(e)}
                  onKeyDown={(e) => handleKeyPress(e)}
                />
                <Button
                  variant="outline"
                  disabled={!searchTerm}
                  onClick={() => searchDecorations(searchTerm)}
                >
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
              {getDecorationsViaCityLoading ||
              getDecorationsViaCountryLoading ||
              getDecorationsViaRegionLoading ||
              searchForDecorationsLoading ? (
                <DecorationsLoading />
              ) : decorations && decorations.length === 0 ? (
                <div className="p-5 flex justify-center items-center text-center flex-col text-ch-red">
                  <Warning size={32} />
                  <span className="mt-3">
                    Could not find any decorations in this area.
                  </span>
                  <span className="text-sm">
                    Try searching for decorations above or using the map
                  </span>
                </div>
              ) : (
                <>
                  <span className="mt-5 text-sm font-semibold dark:text-zinc-500">
                    Decorations
                  </span>
                  <div className="grid grid-cols-1 rounded-lg h-[21rem] overflow-y-auto mb-5 no-scrollbar">
                    {decorations?.map((decoration, index) => (
                      <DecorationCard
                        decorations={decorations}
                        refs={refs}
                        key={decoration.id}
                        decoration={decoration}
                        activeDecoration={activeDecoration}
                        index={index}
                        handleDecorationSelect={handleDecorationSelect}
                        userFavourites={userFavourites?.map(
                          (decoration) => decoration.id
                        )}
                      />
                    ))}
                  </div>
                  <div className="my-5">
                    <Pagi
                      nextPage={nextPage}
                      pageNumber={pageNumber}
                      previousPage={previousPage}
                      setPageNumber={setPageNumber}
                      totalPages={totalPages}
                      visiblePages={3}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop */}
      <aside className="hidden sm:block fixed bottom-0 left-20 top-0 w-96 overflow-y-auto border-r dark:border-black">
        <div className="fixed top-0 w-96 bg-zinc-800 p-8 dark:border-b dark:border-black">
          <h1 className="text-xl font-semibold">Decorations</h1>
          <div className="flex items-center space-x-4 my-5">
            <Input
              type="text"
              placeholder="Search Decorations"
              value={searchTerm}
              onChange={(e) => handleSearchWord(e)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <Button
              variant="outline"
              disabled={!searchTerm}
              onClick={() => searchDecorations(searchTerm)}
            >
              <MagnifyingGlass
                size={16}
                weight="bold"
                className="text-ch-dark dark:text-ch-light"
              />
            </Button>
          </div>
        </div>
        {getDecorationsViaCityLoading ||
        getDecorationsViaCountryLoading ||
        getDecorationsViaRegionLoading ||
        searchForDecorationsLoading ? (
          <DecorationsLoading />
        ) : decorations && decorations.length === 0 ? (
          <div className="mt-44 p-5 flex justify-center items-center text-center flex-col text-ch-red">
            <Warning size={32} />
            <span className="mt-3">
              Could not find any decorations in this area.
            </span>
            <span className="text-sm">
              Try searching for decorations above or using the map
            </span>
          </div>
        ) : (
          <>
            <div className="mt-44 grid grid-cols-1 gap-y-5 p-5 overflow-y-auto">
              {decorations?.map((decoration, index) => (
                <DecorationCard
                  refs={refs}
                  key={decoration.id}
                  decoration={decoration}
                  activeDecoration={activeDecoration}
                  index={index}
                  handleDecorationSelect={handleDecorationSelect}
                  userFavourites={userFavourites?.map(
                    (decoration) => decoration.id
                  )}
                  decorations={decorations}
                />
              ))}
            </div>
            <div className="my-5">
              <Pagi
                nextPage={nextPage}
                pageNumber={pageNumber}
                previousPage={previousPage}
                setPageNumber={setPageNumber}
                totalPages={totalPages}
                visiblePages={3}
              />
            </div>
          </>
        )}
      </aside>
    </>
  );
};
