import { Separator } from "@/components/ui/separator";
import {
  convertDistance,
  convertStepDistance,
  convertTime,
  generateUID,
} from "@/lib/helpers";
import { Step } from "@/lib/types";
import {
  ArrowDown,
  ArrowElbowUpLeft,
  ArrowElbowUpRight,
  ArrowUp,
  CaretCircleRight,
  MapPin,
  Target,
} from "@phosphor-icons/react";
import { useState } from "react";

interface Props {
  routeDuration: number;
  routeDistance: number;
  routeDirections: Step[];
  selectStep: (location: number[]) => void;
}

export const RouteDirections = ({
  routeDistance,
  routeDuration,
  routeDirections,
  selectStep,
}: Props) => {
  const [rotate, setRotate] = useState<boolean>(false);
  const [showDirections, setShowDirections] = useState<boolean>(false);

  const toggleDirections = () => {
    setRotate(!rotate);
    setShowDirections(!showDirections);
  };

  const getDirectionIcon = (direction: string) => {
    if (direction.includes("right")) {
      return (
        <ArrowElbowUpRight
          size={24}
          weight="bold"
          className="dark:text-zinc-300"
        />
      );
    } else if (direction.includes("destination")) {
      return <Target size={24} weight="bold" className="dark:text-zinc-300" />;
    } else if (direction.includes("left")) {
      return (
        <ArrowElbowUpLeft
          size={24}
          weight="bold"
          className="dark:text-zinc-300"
        />
      );
    } else if (direction.includes("north") || direction.includes("straight")) {
      return <ArrowUp size={24} weight="bold" className="dark:text-zinc-300" />;
    } else if (direction.includes("south")) {
      return (
        <ArrowDown size={24} weight="bold" className="dark:text-zinc-300" />
      );
    } else {
      return <MapPin size={24} weight="bold" className="dark:text-zinc-300" />;
    }
  };

  return (
    <>
      {/* Desktop */}
      <div className="absolute p-3 w-72 sm:w-64 rounded-xl top-5 left-5 dark:bg-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-semibold text-lg">
              {convertTime(routeDuration)}
            </span>
            <span className="dark:text-zinc-400">
              {convertDistance(routeDistance)}
            </span>
          </div>
          <button
            onClick={toggleDirections}
            className={`${
              rotate
                ? "rotate-90 transition-all duration-300"
                : "rotate-0 transition-all duration-300"
            }`}
          >
            <CaretCircleRight
              size={28}
              weight="fill"
              className="text-ch-dark dark:text-ch-light"
            />
          </button>
        </div>
        {showDirections ? (
          <div className="mt-2 h-72 overflow-y-auto rounded-lg bg-zinc-700">
            {routeDirections.map((direction, index) => (
              <div key={generateUID()}>
                <div
                  className="p-2 flex items-center space-x-5 cursor-pointer hover:bg-zinc-600"
                  onClick={() => selectStep(direction.maneuver.location)}
                >
                  {getDirectionIcon(direction.maneuver.instruction)}
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-semibold">
                      {convertStepDistance(direction.distance)}
                    </span>
                    <span className="text-xs text-gray-200">
                      {direction.maneuver.instruction}
                    </span>
                  </div>
                </div>
                <Separator style={{ background: "#52525b" }} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};
