import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Search_For_Decorations } from "@/graphql/queries/searchForDecorations/types";
import {
  CustomMarker,
  PopupCard,
} from "@/pages/Home/components/HomeMap/components";
import { Circle } from "@phosphor-icons/react";
import { useRef } from "react";
import Map, {
  GeolocateControl,
  MapRef,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";

interface Props {
  searchedDecorations: Search_For_Decorations[] | undefined;
  viewState: any;
  setViewState: any;
  getDecorationsViaCountryLoading: boolean;
  getDecorationsViaRegionLoading: boolean;
  getDecorationsViaCityLoading: boolean;
  searchForDecorationsLoading: boolean;
  showPopup: (
    e: any,
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Search_For_Decorations
      | undefined
  ) => void;
  closePopup: () => void;
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Country
    | Get_Decorations_Via_Region
    | Search_For_Decorations
    | undefined;
  setActiveDecoration: (
    activeDecoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Search_For_Decorations
      | undefined
  ) => void;
  userFavourites: string[] | undefined;
  activeDecorationIndex: number;
  setActiveDecorationIndex: (activeDecorationIndex: number) => void;
}

export const SearchMap = ({
  searchedDecorations,
  viewState,
  setViewState,
  getDecorationsViaCityLoading,
  getDecorationsViaCountryLoading,
  getDecorationsViaRegionLoading,
  searchForDecorationsLoading,
  closePopup,
  showPopup,
  activeDecoration,
  setActiveDecoration,
  userFavourites,
  activeDecorationIndex,
  setActiveDecorationIndex,
}: Props) => {
  const mapRef = useRef<MapRef>();
  return (
    <>
      <Map
        {...viewState}
        //@ts-ignore
        ref={mapRef}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
        onMove={(e) => setViewState(e.viewState)}
        onZoom={(e) => setViewState(e.viewState)}
        maxZoom={17}
        onClick={closePopup}
      >
        {getDecorationsViaCountryLoading ||
        getDecorationsViaRegionLoading ||
        getDecorationsViaCityLoading ||
        searchForDecorationsLoading ? (
          <div className="absolute top-0 left-1/2 mt-5 w-16 h-8 rounded-lg bg-white z-40">
            <div className="flex justify-center space-x-1 items-center h-full">
              <Circle
                size={12}
                color="#3b403d"
                weight="fill"
                className="animate-bounce [animation-delay:-0.3s]"
              />
              <Circle
                size={12}
                color="#3b403d"
                weight="fill"
                className="animate-bounce [animation-delay:-0.15s]"
              />
              <Circle
                size={12}
                color="#3b403d"
                weight="fill"
                className="animate-bounce"
              />
            </div>
          </div>
        ) : null}

        {searchedDecorations?.map((decoration, index) => (
          <>
            <Marker
              key={decoration.id}
              style={{
                zIndex: activeDecorationIndex === index ? 98 : "unset",
              }}
              longitude={decoration.longitude}
              latitude={decoration.latitude}
              onClick={(e) => showPopup(e, decoration)}
            >
              <CustomMarker
                activeDecoration={activeDecoration}
                decoration={decoration}
                setActiveDecoration={setActiveDecoration}
                setActiveDecorationIndex={setActiveDecorationIndex}
                index={index}
              />

              {activeDecoration ? (
                <Popup
                  closeButton={false}
                  anchor="top"
                  longitude={activeDecoration.longitude}
                  latitude={activeDecoration.latitude}
                  onClose={() => setActiveDecoration(undefined)}
                >
                  <PopupCard
                    activeDecoration={activeDecoration}
                    setActiveDecoration={setActiveDecoration}
                    userFavourites={userFavourites}
                  />
                </Popup>
              ) : null}
            </Marker>
          </>
        ))}

        <NavigationControl />
        <GeolocateControl />
      </Map>
    </>
  );
};
