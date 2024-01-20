import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Decoration, ViewState } from "@/lib/types";
import { CustomMarker } from "@/pages/Home/components/HomeMap/components";
import { Circle } from "@phosphor-icons/react";
import { MutableRefObject, useEffect, useRef } from "react";
import Map, {
  GeolocateControl,
  MapRef,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";

interface Props {
  viewState: ViewState;
  setViewState: (viewState: ViewState) => void;
  decorations:
    | Get_Decorations_Via_City[]
    | Get_Decorations_Via_Country[]
    | Get_Decorations_Via_Region[]
    | null;
  activeDecoration:
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Country
    | Get_Decorations_Via_Region
    | Decoration
    | undefined;
  setActiveDecoration: (
    activeDecoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | Decoration
      | undefined
  ) => void;
  activeDecorationIndex: number;
  setActiveDecorationIndex: (activeDecorationIndex: number) => void;
  getDecorationsViaCountryLoading: boolean;
  getDecorationsViaCityLoading: boolean;
  getDecorationsViaRegionLoading: boolean;
  mapRef: MutableRefObject<MapRef | undefined>;
  handleScroll: (decorationId: string, index: number) => void;
}

export const RouteMap = ({
  viewState,
  setViewState,
  decorations,
  activeDecoration,
  setActiveDecoration,
  activeDecorationIndex,
  setActiveDecorationIndex,
  getDecorationsViaCityLoading,
  getDecorationsViaCountryLoading,
  getDecorationsViaRegionLoading,
  mapRef,
  handleScroll,
}: Props) => {
  return (
    <Map
      {...viewState}
      //@ts-ignore
      ref={mapRef}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
      onMove={(e) => setViewState(e.viewState)}
      onZoom={(e) => setViewState(e.viewState)}
      maxZoom={13.5}
    >
      {getDecorationsViaCountryLoading ||
      getDecorationsViaRegionLoading ||
      getDecorationsViaCityLoading ? (
        <div className="absolute top-0 left-[48%] mt-5 w-16 h-8 rounded-lg bg-white z-40">
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

      {decorations?.map((decoration, index: number) => (
        <>
          <Marker
            key={decoration.id}
            style={{
              zIndex: activeDecorationIndex === index ? 98 : "unset",
            }}
            longitude={decoration.longitude}
            latitude={decoration.latitude}
            onClick={() => handleScroll(decoration.id, index)}
          >
            <CustomMarker
              activeDecoration={activeDecoration}
              activeDecorationIndex={activeDecorationIndex}
              decoration={decoration}
              index={index}
              setActiveDecoration={setActiveDecoration}
              setActiveDecorationIndex={setActiveDecorationIndex}
            />
          </Marker>
        </>
      ))}

      <NavigationControl />
      <GeolocateControl />
    </Map>
  );
};
