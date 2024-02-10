import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";

interface Props {
  isLocationOpen: boolean;
  setIsLocationOpen: (isLocationOpen: boolean) => void;
  setStartAtUserLocation: (startAtUserLocation: boolean) => void;
  getUserCoords: () => void;
}

export const LocationModal = ({
  isLocationOpen,
  setIsLocationOpen,
  setStartAtUserLocation,
  getUserCoords,
}: Props) => {
  return (
    <Transition appear show={isLocationOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsLocationOpen(true)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Add your location
                </Dialog.Title>
                <div className="mt-2 text-ch-dark dark:text-ch-light">
                  <p>
                    Would you like to start this route from your location?
                    Selecting "No" will start the route from the first
                    decoration.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-10">
                  <Button
                    variant="secondary"
                    onClick={() => setStartAtUserLocation(false)}
                  >
                    No
                  </Button>
                  <Button variant="default" onClick={getUserCoords}>
                    Yes
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
