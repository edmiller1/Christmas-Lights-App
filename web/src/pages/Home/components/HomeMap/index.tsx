import { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_DECORATIONS_VIA_COUNTRY,
  GET_DECORATIONS_VIA_REGION,
} from "@/graphql/queries";
import {
  GetDecorationsViaCountry as GetDecorationsViaCountryData,
  GetDecorationsViaCountryArgs,
  Get_Decorations_Via_Country,
} from "@/graphql/queries/getDecorationsViaCountry/types";
import {
  GetDecorationsViaRegion as GetDecorationsViaRegionData,
  GetDecorationsViaRegionArgs,
} from "@/graphql/queries/getDecorationsViaRegion/types";
import Map, {
  Layer,
  MapRef,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { Decoration } from "@/lib/types";
import { Circle } from "@phosphor-icons/react";

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
  userFavourites: Decoration[] | undefined;
}

export const HomeMap = ({ setMapLoading, userFavourites }: Props) => {
  const mapRef = useRef<MapRef>();
  const [viewState, setViewState] = useState(initialViewState);
  const [activeDecorationIndex, setActiveDecorationIndex] = useState<number>(0);
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
        setDecorations(data.getDecorationsViaCountry);
      },
    }
  );

  const [getDecorationsViaRegion, { loading: getDecorationsViaRegionLoading }] =
    useLazyQuery<GetDecorationsViaRegionData, GetDecorationsViaRegionArgs>(
      GET_DECORATIONS_VIA_REGION,
      {
        onCompleted: (data) => {
          setDecorations(data.getDecorationsViaRegion);
        },
      }
    );
  useEffect(() => {
    const getDecorationData = setTimeout(() => {
      if (viewState && viewState.zoom <= 6) {
        getDecorationsViaCountry({
          variables: {
            input: {
              latitude: viewState.latitude?.toString() as string,
              longitude: viewState.longitude?.toString() as string,
            },
          },
        });
      } else if (viewState && viewState.zoom > 6 && viewState.zoom <= 10) {
        getDecorationsViaRegion({
          variables: {
            input: {
              latitude: viewState.latitude?.toString() as string,
              longitude: viewState.longitude?.toString() as string,
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
      <div className="sm:hidden pt-16 min-h-screen -pb-24 absolute rounded-lg">
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
          <NavigationControl />
        </Map>
      </div>

      <div className="absolute pt-16 h-full w-full">
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
          {getDecorationsViaCountryLoading || getDecorationsViaRegionLoading ? (
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
          <NavigationControl />
        </Map>
      </div>
    </>
  );
};
