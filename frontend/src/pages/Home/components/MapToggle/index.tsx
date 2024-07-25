import { House, MapTrifold } from "@phosphor-icons/react";

interface Props {
  showMap: boolean;
  setShowMap: (showMap: boolean) => void;
  mapLoading: boolean;
}

export const MapToggle = ({ mapLoading, showMap, setShowMap }: Props) => {
  return (
    <>
      {!showMap ? (
        <div className="fixed z-20 bottom-10 sm:bottom-24 left-[40%] sm:left-1/2">
          <button
            onClick={() => setShowMap(true)}
            className="z-50 flex items-center px-3 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-lg bg-ch-green hover:scale-110"
          >
            Map
            <MapTrifold
              size={24}
              weight="fill"
              color="#ffffff"
              className="ml-2"
            />
          </button>
        </div>
      ) : (
        <div className="fixed z-20 bottom-10 sm:bottom-24 left-[40%] sm:left-1/2">
          <button
            disabled={mapLoading}
            onClick={() => setShowMap(false)}
            className="flex items-center text-sm py-2 px-3 font-semibold rounded-full shadow-lg text-white bg-ch-green z-[98] hover:scale-110 transition-all"
          >
            Home
            <House size={24} weight="fill" color="#ffffff" className="ml-2" />
          </button>
        </div>
      )}
    </>
  );
};
