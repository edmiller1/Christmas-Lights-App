import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Search_For_Decorations } from "@/graphql/queries/searchForDecorations/types";
import { Warning } from "@phosphor-icons/react";
import { DecorationCard, DecorationsLoading, Pagi } from "..";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "@supabase/supabase-js";

interface Props {
  searchQuery: string | null;
  searchForDecorationsLoading: boolean;
  getDecorationsViaCountryLoading: boolean;
  getDecorationsViaRegionLoading: boolean;
  getDecorationsViaCityLoading: boolean;
  searchedDecorations:
    | Search_For_Decorations[]
    | Get_Decorations_Via_City[]
    | Get_Decorations_Via_Country[]
    | Get_Decorations_Via_Region[]
    | undefined;
  setOpenSearchDrawer: (openSearchDrawer: boolean) => void;
  currentUser: User | null | undefined;
  refetchUserData: () => void;
  userFavourites: string[] | undefined;
  nextPage: () => void;
  previousPage: () => void;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  totalPages: number;
}

export const SearchDrawer = ({
  searchQuery,
  getDecorationsViaCityLoading,
  getDecorationsViaCountryLoading,
  getDecorationsViaRegionLoading,
  searchForDecorationsLoading,
  searchedDecorations,
  setOpenSearchDrawer,
  currentUser,
  refetchUserData,
  userFavourites,
  nextPage,
  pageNumber,
  previousPage,
  setPageNumber,
  totalPages,
}: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed shadow w-full max-w-[560px] z-50 h-[82%] bottom-0 left-0 right-0 flex flex-col px-3 rounded-t-[10px] bg-slate-50 dark:bg-zinc-900 border-t dark:border-black"
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
            onClick={() => setOpenSearchDrawer(false)}
          ></button>
        </div>
        <div className="dark:text-white">
          <div className="my-5">
            {getDecorationsViaCountryLoading ||
            getDecorationsViaRegionLoading ||
            getDecorationsViaCityLoading ||
            searchForDecorationsLoading ? (
              <DecorationsLoading />
            ) : searchedDecorations && searchedDecorations.length === 0 ? (
              <div className="mt-44 text-center flex flex-col justify-center items-center text-xl text-ch-red">
                <Warning size={40} weight="bold" />
                <span>
                  Could not find any decorations for search term:{" "}
                  <strong>{searchQuery}</strong>
                </span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-y-5 h-[40rem] overflow-y-auto no-scrollbar mb-5">
                  {searchedDecorations?.map((decoration, index) => (
                    <DecorationCard
                      key={decoration.id}
                      currentUser={currentUser}
                      decoration={decoration}
                      decorations={searchedDecorations}
                      index={index}
                      refetchUserData={refetchUserData}
                      userFavourites={userFavourites}
                    />
                  ))}
                </div>
                <Pagi
                  nextPage={nextPage}
                  pageNumber={pageNumber}
                  previousPage={previousPage}
                  setPageNumber={setPageNumber}
                  totalPages={totalPages}
                  visiblePages={3}
                />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
