import { Get_Decorations_Via_City } from "@/graphql/queries/getDecorationsViaCity/types";
import { Get_Decorations_Via_Country } from "@/graphql/queries/getDecorationsViaCountry/types";
import { Get_Decorations_Via_Region } from "@/graphql/queries/getDecorationsViaRegion/types";
import { Decoration, ViewState } from "@/lib/types";
import { CustomMarker } from "@/pages/Home/components/HomeMap/components";
import { ChatCentered, Circle } from "@phosphor-icons/react";
import { MutableRefObject } from "react";
import Map, {
  GeolocateControl,
  Layer,
  MapRef,
  Marker,
  NavigationControl,
  Source,
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
  getDecorationsViaCountryLoading: boolean;
  getDecorationsViaCityLoading: boolean;
  getDecorationsViaRegionLoading: boolean;
  mapRef: MutableRefObject<MapRef | undefined>;
  handleScroll: (decorationId: string, index: number) => void;
  currentlyOnRoute: boolean;
  routeLayer: any;
  routeGeoJson: {
    type: string;
    coordinates: number[][];
  } | null;
  routeDecorations: Decoration[] | null;
  activeDecorationIndex: number;
  setActiveDecorationIndex: (activeDecorationIndex: number) => void;
}

export const RouteMap = ({
  viewState,
  setViewState,
  decorations,
  activeDecoration,
  setActiveDecoration,
  getDecorationsViaCityLoading,
  getDecorationsViaCountryLoading,
  getDecorationsViaRegionLoading,
  mapRef,
  handleScroll,
  currentlyOnRoute,
  routeLayer,
  routeGeoJson,
  routeDecorations,
  activeDecorationIndex,
  setActiveDecorationIndex,
}: Props) => {
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
      >
        {currentlyOnRoute ? (
          <>
            <Source id="currentRoute" type="geojson" data={routeGeoJson as any}>
              <Layer {...routeLayer}></Layer>
            </Source>
            <Marker
              longitude={Number(localStorage.getItem("longitude"))}
              latitude={Number(localStorage.getItem("latitude"))}
            >
              <Circle size={28} weight="fill" color="#28a177" />
            </Marker>
            {routeDecorations?.map((decoration, index) => (
              <Marker
                key={decoration.id}
                longitude={decoration.longitude}
                latitude={decoration.latitude}
              >
                <div className="relative">
                  <ChatCentered size={48} weight="fill" color="#28a177" />
                  <span className="absolute top-2 left-[1.15rem] font-bold text-xl">
                    {index + 1}
                  </span>
                </div>
              </Marker>
            ))}
          </>
        ) : null}

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

        {!currentlyOnRoute &&
          decorations?.map((decoration, index: number) => (
            <>
              <Marker
                key={decoration.id}
                style={{
                  zIndex: activeDecorationIndex === index ? 49 : "unset",
                }}
                longitude={decoration.longitude}
                latitude={decoration.latitude}
                onClick={() => handleScroll(decoration.id, index)}
              >
                <CustomMarker
                  activeDecoration={activeDecoration}
                  decoration={decoration}
                  setActiveDecoration={setActiveDecoration}
                  activeDecorationIndex={activeDecorationIndex}
                  setActiveDecorationIndex={setActiveDecorationIndex}
                  index={index}
                />
              </Marker>
            </>
          ))}

        <NavigationControl />
        <GeolocateControl />
      </Map>
    </>
  );
};
