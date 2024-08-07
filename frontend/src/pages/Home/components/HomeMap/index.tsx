import { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_DECORATIONS_VIA_CITY,
  GET_DECORATIONS_VIA_COUNTRY,
  GET_DECORATIONS_VIA_REGION,
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
import Map, {
  GeolocateControl,
  MapRef,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { Circle, Heart, Star, X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { CustomMarker, PopupCard } from "@/components";

const initialViewState = {
  latitude: localStorage.getItem("latitude")
    ? localStorage.getItem("latitude")
    : -40.8536,
  longitude: localStorage.getItem("longitude")
    ? localStorage.getItem("longitude")
    : 155.4537,
  zoom: localStorage.getItem("latitude") ? 6 : 4,
  bearing: 0,
  pitch: 0,
};

interface Props {
  setMapLoading: (mapLoading: boolean) => void;
  userFavourites: string[] | undefined;
}

export const HomeMap = ({ setMapLoading, userFavourites }: Props) => {
  const mapRef = useRef<MapRef>();
  const [viewState, setViewState] = useState(initialViewState);
  const [activeDecorationIndex, setActiveDecorationIndex] = useState<number>(0);
  const [activeDecoration, setActiveDecoration] = useState<
    | Get_Decorations_Via_City
    | Get_Decorations_Via_Country
    | Get_Decorations_Via_Region
  >();
  const [decorations, setDecorations] = useState<
    Get_Decorations_Via_Country[] | undefined
  >();

  const [
    getDecorationsViaCountry,
    { loading: getDecorationsViaCountryLoading },
  ] = useLazyQuery<GetDecorationsViaCountryData, GetDecorationsViaCountryArgs>(
    GET_DECORATIONS_VIA_COUNTRY,
    {
      onCompleted: (data) => {
        setDecorations(data.getDecorationsViaCountry.decorations);
      },
    }
  );

  const [getDecorationsViaCity, { loading: getDecorationsViaCityLoading }] =
    useLazyQuery<GetDecorationsViaCityData, GetDecorationsViaCityArgs>(
      GET_DECORATIONS_VIA_CITY,
      {
        onCompleted: (data) => {
          setDecorations(data.getDecorationsViaCity.decorations);
        },
      }
    );

  const [getDecorationsViaRegion, { loading: getDecorationsViaRegionLoading }] =
    useLazyQuery<GetDecorationsViaRegionData, GetDecorationsViaRegionArgs>(
      GET_DECORATIONS_VIA_REGION,
      {
        onCompleted: (data) => {
          setDecorations(data.getDecorationsViaRegion.decorations);
        },
      }
    );

  const showPopup = (
    e: any,
    decoration:
      | Get_Decorations_Via_City
      | Get_Decorations_Via_Country
      | Get_Decorations_Via_Region
      | undefined
  ) => {
    e.originalEvent.stopPropagation();
    setActiveDecoration(decoration);
  };

  const closePopup = () => {
    if (activeDecoration) {
      setActiveDecoration(undefined);
      setActiveDecorationIndex(0);
    }
  };

  useEffect(() => {
    const getDecorationData = setTimeout(() => {
      if (viewState && viewState.zoom <= 6) {
        getDecorationsViaCountry({
          variables: {
            input: {
              latitude: viewState.latitude?.toString() as string,
              longitude: viewState.longitude?.toString() as string,
              skip: 0,
            },
          },
        });
      } else if (viewState && viewState.zoom > 6 && viewState.zoom <= 10) {
        getDecorationsViaRegion({
          variables: {
            input: {
              latitude: viewState.latitude?.toString() as string,
              longitude: viewState.longitude?.toString() as string,
              skip: 0,
            },
          },
        });
      } else {
        getDecorationsViaCity({
          variables: {
            input: {
              latitude: viewState.latitude?.toString() as string,
              longitude: viewState.longitude?.toString() as string,
              skip: 0,
            },
          },
        });
      }
    }, 1000);

    return () => clearTimeout(getDecorationData);
  }, [viewState]);

  useEffect(() => {
    setMapLoading(true);
    setTimeout(() => {
      setMapLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      <div className="absolute min-h-screen rounded-lg sm:hidden -pb-24">
        <Map
          {...viewState}
          //@ts-ignore
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
          onMove={(e) => setViewState(e.viewState)}
          onZoom={(e) => setViewState(e.viewState)}
          maxZoom={13.5}
          onClick={closePopup}
        >
          {getDecorationsViaCountryLoading ||
          getDecorationsViaRegionLoading ||
          getDecorationsViaCityLoading ? (
            <div className="absolute top-0 z-40 w-16 h-8 mt-5 bg-white rounded-lg">
              <div className="flex items-center justify-center h-full space-x-1">
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
                onClick={(e) => showPopup(e, decoration)}
              >
                <CustomMarker
                  activeDecoration={activeDecoration}
                  decoration={decoration}
                  setActiveDecoration={setActiveDecoration}
                  setActiveDecorationIndex={setActiveDecorationIndex}
                  index={index}
                />
              </Marker>
            </>
          ))}

          <NavigationControl />
          <GeolocateControl />
        </Map>
        {activeDecoration ? (
          <Link to={`/decoration/${activeDecoration.id}`}>
            <div className="flex absolute text-black bottom-24 h-32 w-96 bg-white rounded-xl left-6 z-[99]">
              <div className="w-[40%] relative">
                <div
                  role="button"
                  className="absolute p-1 bg-black rounded-full left-2 top-2 opacity-80"
                  onClick={closePopup}
                >
                  <X size={16} weight="bold" color="#FFFFFF" />
                </div>
                <img
                  src={activeDecoration?.images[0].url}
                  alt="Christmas decoration"
                  className="object-cover object-center w-full h-full rounded-tl-xl rounded-bl-xl"
                />
              </div>
              <div className="w-[60%] p-2">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {activeDecoration.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {activeDecoration.city}, {activeDecoration.country}
                    </span>
                  </div>
                  {userFavourites?.includes(activeDecoration.id) ? (
                    <Heart size={20} weight="fill" color="#FF647F" />
                  ) : (
                    <Heart size={20} weight="bold" color="#000000" />
                  )}
                </div>
                <div className="absolute flex items-center space-x-1 right-2 bottom-2">
                  <Star size={16} weight="fill" color="#000000" />
                  <span className="mt-[0.15rem] text-sm">
                    {activeDecoration.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ) : null}
      </div>

      <div className="absolute w-full h-full">
        <Map
          {...viewState}
          //@ts-ignore
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
          onMove={(e) => setViewState(e.viewState)}
          onZoom={(e) => setViewState(e.viewState)}
          maxZoom={13.5}
          onClick={() => setActiveDecoration(undefined)}
        >
          {getDecorationsViaCountryLoading ||
          getDecorationsViaRegionLoading ||
          getDecorationsViaCityLoading ? (
            <div className="absolute top-0 z-40 w-16 h-8 mt-5 bg-white rounded-lg left-1/2">
              <div className="flex items-center justify-center h-full space-x-1">
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
                  zIndex: activeDecorationIndex === index ? 99 : "unset",
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
              </Marker>

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
            </>
          ))}

          <NavigationControl />
          <GeolocateControl />
        </Map>
      </div>
    </>
  );
};
