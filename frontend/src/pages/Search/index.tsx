import { AppHeader, DecorationCard, Paginate, SEO } from "@/components";
import {
  GET_DECORATIONS_VIA_CITY,
  GET_DECORATIONS_VIA_COUNTRY,
  GET_DECORATIONS_VIA_REGION,
  GET_USER,
  SEARCH_FOR_DECORATIONS,
} from "@/graphql/queries";
import {
  GetDecorationsViaCity as GetDecorationsViaCityData,
  GetDecorationsViaCityArgs,
  Get_Decorations_Via_City,
} from "@/graphql/queries/getDecorationsViaCity/types";
import {
  GetDecorationsViaCountry as GetDecorationsViaCountryData,
  GetDecorationsViaCountryArgs,
  Get_Decorations_Via_Country,
} from "@/graphql/queries/getDecorationsViaCountry/types";
import {
  GetDecorationsViaRegion as GetDecorationsViaRegionData,
  GetDecorationsViaRegionArgs,
  Get_Decorations_Via_Region,
} from "@/graphql/queries/getDecorationsViaRegion/types";
import { GetUser as GetUserData } from "../../graphql/queries/getUser/types";
import {
  SearchForDecorations as SearchForDecorationsData,
  SearchForDecorationsArgs,
  Search_For_Decorations,
} from "@/graphql/queries/searchForDecorations/types";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { AppHeaderLoading } from "@/components/AppHeader/components";
import { useEffect, useState } from "react";
import { DecorationsLoading, SearchDrawer, SearchMap } from "./components";
import { Warning } from "@phosphor-icons/react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const initialViewState = {
  latitude: localStorage.getItem("latitude") || 0,
  longitude: localStorage.getItem("longitude") || 0,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

export const Search = () => {
  const { isAuthenticated, user } = useKindeAuth();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  const [openSearchDrawer, setOpenSearchDrawer] = useState<boolean>(false);

  const [globalType, setGlobalType] = useState<string>("search");
  const [viewState, setViewState] = useState<any>(initialViewState);
  const [searchedDecorations, setSearchedDecorations] = useState<
    | Search_For_Decorations[]
    | Get_Decorations_Via_City[]
    | Get_Decorations_Via_Country[]
    | Get_Decorations_Via_Region[]
    | undefined
  >();
  const [activeDecoration, setActiveDecoration] = useState<
    | Search_For_Decorations
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Country
    | Get_Decorations_Via_Region
    | undefined
  >();
  const [activeDecorationIndex, setActiveDecorationIndex] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [
    getDecorationsViaCountry,
    { loading: getDecorationsViaCountryLoading },
  ] = useLazyQuery<GetDecorationsViaCountryData, GetDecorationsViaCountryArgs>(
    GET_DECORATIONS_VIA_COUNTRY,
    {
      onCompleted: (data) => {
        setTotalPages(Math.ceil(data.getDecorationsViaCountry.count / 18));
        setSearchedDecorations(data.getDecorationsViaCountry.decorations);
        setGlobalType(data.getDecorationsViaCountry.type);
      },
    }
  );

  const [getDecorationsViaCity, { loading: getDecorationsViaCityLoading }] =
    useLazyQuery<GetDecorationsViaCityData, GetDecorationsViaCityArgs>(
      GET_DECORATIONS_VIA_CITY,
      {
        onCompleted: (data) => {
          setTotalPages(Math.ceil(data.getDecorationsViaCity.count / 18));
          setSearchedDecorations(data.getDecorationsViaCity.decorations);
          setGlobalType(data.getDecorationsViaCity.type);
        },
      }
    );

  const [getDecorationsViaRegion, { loading: getDecorationsViaRegionLoading }] =
    useLazyQuery<GetDecorationsViaRegionData, GetDecorationsViaRegionArgs>(
      GET_DECORATIONS_VIA_REGION,
      {
        onCompleted: (data) => {
          setTotalPages(Math.ceil(data.getDecorationsViaRegion.count / 18));
          setSearchedDecorations(data.getDecorationsViaRegion.decorations);
          setGlobalType(data.getDecorationsViaRegion.type);
        },
      }
    );

  const {
    data: getUserData,
    loading: getUserLoading,
    refetch: refetchUser,
  } = useQuery<GetUserData>(GET_USER, {
    skip: !user,
  });

  const {
    loading: searchForDecorationsLoading,
    refetch: refetchSearchedDecorations,
  } = useQuery<SearchForDecorationsData, SearchForDecorationsArgs>(
    SEARCH_FOR_DECORATIONS,
    {
      variables: {
        input: {
          searchTerm: searchQuery ? searchQuery : "",
          skip: (pageNumber - 1) * 18,
        },
      },
      onCompleted: (data) => {
        setTotalPages(Math.ceil(data.searchForDecorations.count / 18));
        setSearchedDecorations(data.searchForDecorations.decorations);
        setGlobalType(data.searchForDecorations.type);
        const newViewState = {
          latitude: data.searchForDecorations.decorations[0].latitude,
          longitude: data.searchForDecorations.decorations[0].longitude,
          zoom: 14,
          bearing: 0,
          pitch: 0,
        };
        setViewState(newViewState);
      },
    }
  );

  const currentUser = getUserData?.getUser ? getUserData.getUser : null;

  const refetchUserData = () => {
    refetchUser();
  };

  const showPopup = (
    e: any,
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Search_For_Decorations
      | undefined
  ) => {
    e.originalEvent.stopPropagation();
    setActiveDecoration(decoration);
  };

  const closePopup = () => {
    if (activeDecoration) {
      setActiveDecoration(undefined);
    }
  };

  const refetchDecorations = (
    type: string,
    viewState: any,
    pageNumber: number
  ) => {
    if (type === "city") {
      getDecorationsViaCity({
        variables: {
          input: {
            latitude: viewState.latitude?.toString() as string,
            longitude: viewState.longitude?.toString() as string,
            skip: pageNumber * 18,
          },
        },
      });
    } else if (type === "region") {
      getDecorationsViaCity({
        variables: {
          input: {
            latitude: viewState.latitude?.toString() as string,
            longitude: viewState.longitude?.toString() as string,
            skip: pageNumber * 18,
          },
        },
      });
    } else if (type === "country") {
      getDecorationsViaCountry({
        variables: {
          input: {
            latitude: viewState.latitude?.toString() as string,
            longitude: viewState.longitude?.toString() as string,
            skip: pageNumber * 18,
          },
        },
      });
    } else if (type === "search") {
      refetchSearchedDecorations({
        input: {
          searchTerm: searchQuery ? searchQuery : "",
          skip: pageNumber * 18,
        },
      });
    }
  };

  const previousPage = () => {
    if (pageNumber === 1) {
      return;
    } else {
      setPageNumber(pageNumber - 1);
      refetchDecorations(globalType, viewState, pageNumber);
    }
  };

  const nextPage = () => {
    if (pageNumber === totalPages) {
      return;
    } else {
      setPageNumber(pageNumber + 1);
      refetchDecorations(globalType, viewState, pageNumber);
    }
  };

  useEffect(() => {
    if (viewState && viewState.zoom !== 14) {
      const getDecorationData = setTimeout(() => {
        if (viewState && viewState.zoom <= 6) {
          getDecorationsViaCountry({
            variables: {
              input: {
                latitude: viewState.latitude?.toString() as string,
                longitude: viewState.longitude?.toString() as string,
                skip: (pageNumber - 1) * 18,
              },
            },
          });
        } else if (viewState && viewState.zoom > 6 && viewState.zoom <= 10) {
          getDecorationsViaRegion({
            variables: {
              input: {
                latitude: viewState.latitude?.toString() as string,
                longitude: viewState.longitude?.toString() as string,
                skip: (pageNumber - 1) * 18,
              },
            },
          });
        } else {
          getDecorationsViaCity({
            variables: {
              input: {
                latitude: viewState.latitude?.toString() as string,
                longitude: viewState.longitude?.toString() as string,
                skip: (pageNumber - 1) * 18,
              },
            },
          });
        }
      }, 1000);
      return () => clearTimeout(getDecorationData);
    }
  }, [viewState]);

  return (
    <>
      <SEO
        description="View decorations based on search"
        name={`Results for: ${searchQuery!}`}
        title={`Results for: ${searchQuery!}`}
        type={`Results for: ${searchQuery!}`}
      />
      {/* Mobile */}
      <div className="h-screen sm:hidden">
        {getUserLoading ? (
          <AppHeaderLoading />
        ) : (
          <AppHeader
            currentUser={currentUser}
            searchQuery={searchQuery}
            isAuthenticated={isAuthenticated}
          />
        )}
        <div className="fixed w-screen h-screen top-16">
          <SearchMap
            searchedDecorations={searchedDecorations}
            viewState={viewState}
            setViewState={setViewState}
            getDecorationsViaCountryLoading={getDecorationsViaCountryLoading}
            getDecorationsViaCityLoading={getDecorationsViaCityLoading}
            getDecorationsViaRegionLoading={getDecorationsViaRegionLoading}
            searchForDecorationsLoading={searchForDecorationsLoading}
            showPopup={showPopup}
            closePopup={closePopup}
            activeDecoration={activeDecoration}
            setActiveDecoration={setActiveDecoration}
            userFavourites={currentUser?.favourites.map(
              (favourite) => favourite.id
            )}
            activeDecorationIndex={activeDecorationIndex}
            setActiveDecorationIndex={setActiveDecorationIndex}
          />
        </div>
        <div className="fixed shadow w-full max-w-[560px] p-2 z-50 bottom-0 left-0 right-0 flex flex-col rounded-t-[10px] bg-slate-50 dark:bg-zinc-900 border-t dark:border-black">
          <div>
            <div className="flex items-center justify-center w-full mt-2">
              <button
                className="w-1/4 h-3 rounded-full bg-zinc-700"
                onClick={() => setOpenSearchDrawer(true)}
              ></button>
            </div>
            {openSearchDrawer ? (
              <SearchDrawer
                searchQuery={searchQuery}
                getDecorationsViaCityLoading={getDecorationsViaCityLoading}
                getDecorationsViaCountryLoading={
                  getDecorationsViaCountryLoading
                }
                getDecorationsViaRegionLoading={getDecorationsViaRegionLoading}
                searchForDecorationsLoading={searchForDecorationsLoading}
                searchedDecorations={searchedDecorations}
                setOpenSearchDrawer={setOpenSearchDrawer}
                isAuthenticated={isAuthenticated}
                refetchUserData={refetchUserData}
                userFavourites={currentUser?.favourites.map((item) => item.id)}
                nextPage={nextPage}
                pageNumber={pageNumber}
                previousPage={previousPage}
                setPageNumber={setPageNumber}
                totalPages={totalPages}
              />
            ) : null}
          </div>
          <div className="px-3 py-5">
            <span className="font-semibold">
              Showing top results for: <strong>{searchQuery}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        {getUserLoading ? (
          <AppHeaderLoading />
        ) : (
          <AppHeader
            currentUser={currentUser}
            searchQuery={searchQuery}
            isAuthenticated={isAuthenticated}
          />
        )}
        <div className="flex pt-16">
          <div className="w-3/5 px-5 py-3 min-h-[92.6vh]">
            {searchForDecorationsLoading ? (
              <div className="w-1/4 h-10 bg-gray-200 rounded-lg animate-pulse dark:bg-zinc-700"></div>
            ) : (
              <span className="font-semibold">
                Showing top results for: <strong>{searchQuery}</strong>
              </span>
            )}
            {getDecorationsViaCountryLoading ||
            getDecorationsViaRegionLoading ||
            getDecorationsViaCityLoading ||
            searchForDecorationsLoading ? (
              <DecorationsLoading />
            ) : searchedDecorations && searchedDecorations.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-xl mt-44 text-primary">
                <Warning size={40} weight="bold" />
                <span>
                  Could not find any decorations for search term:{" "}
                  <strong>{searchQuery}</strong>
                </span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 mt-5 mb-10 gap-x-6 gap-y-10">
                  {searchedDecorations?.map((decoration, index) => (
                    <DecorationCard
                      key={decoration.id}
                      isAuthenticated={isAuthenticated}
                      decoration={decoration}
                      decorations={searchedDecorations}
                      index={index}
                      refetchUserData={refetchUserData}
                      userFavourites={currentUser?.favourites.map(
                        (item) => item.id
                      )}
                    />
                  ))}
                </div>
                <Paginate
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
          <div className="fixed bottom-0 right-0 w-2/5 top-16">
            <SearchMap
              searchedDecorations={searchedDecorations}
              viewState={viewState}
              setViewState={setViewState}
              getDecorationsViaCountryLoading={getDecorationsViaCountryLoading}
              getDecorationsViaCityLoading={getDecorationsViaCityLoading}
              getDecorationsViaRegionLoading={getDecorationsViaRegionLoading}
              searchForDecorationsLoading={searchForDecorationsLoading}
              showPopup={showPopup}
              closePopup={closePopup}
              activeDecoration={activeDecoration}
              setActiveDecoration={setActiveDecoration}
              userFavourites={currentUser?.favourites.map((item) => item.id)}
              activeDecorationIndex={activeDecorationIndex}
              setActiveDecorationIndex={setActiveDecorationIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
};
