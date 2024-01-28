import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { CircleNotch } from "@phosphor-icons/react";

interface Props {
  isRemoveDecorationOpen: boolean;
  setIsRemoveDecorationOpen: (isRemoveDecorationOpen: boolean) => void;
  decorationToRemove: string;
  removalRoute: string;
  removeDecorationFromARoute: (routeId: string, decorationId: string) => void;
  removeDecorationFromRouteLoading: boolean;
}

export const RemoveDecorationModal = ({
  isRemoveDecorationOpen,
  setIsRemoveDecorationOpen,
  removeDecorationFromARoute,
  removalRoute,
  decorationToRemove,
  removeDecorationFromRouteLoading,
}: Props) => {
  return (
    <Transition appear show={isRemoveDecorationOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsRemoveDecorationOpen(false)}
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
                {removeDecorationFromRouteLoading ? (
                  <div className="h-64 flex flex-col items-center justify-center space-y-2">
                    <CircleNotch
                      size={80}
                      className="animate-spin text-ch-dark dark:text-ch-light"
                    />
                    <span className="text-lg text-ch-dark dark:text-ch-light">
                      Removing decoration...
                    </span>
                  </div>
                ) : (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                    >
                      Remove Decoration
                    </Dialog.Title>
                    <div className="mt-2 text-ch-dark dark:text-ch-light">
                      <p>
                        Are you sure you want to remove this decoration from
                        this route?
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-10">
                      <Button
                        variant="secondary"
                        onClick={() => setIsRemoveDecorationOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="default"
                        onClick={() =>
                          removeDecorationFromARoute(
                            removalRoute,
                            decorationToRemove
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
