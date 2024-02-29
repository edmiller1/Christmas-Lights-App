import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { CircleNotch } from "@phosphor-icons/react";

interface Props {
  isDeleteRouteOpen: boolean;
  setIsDeleteRouteOpen: (isDeleteRouteOpen: boolean) => void;
  deleteARoute: (routeId: string) => void;
  routeToDelete: string;
  deleteRouteLoading: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const DeleteRouteModal = ({
  isDeleteRouteOpen,
  setIsDeleteRouteOpen,
  deleteARoute,
  routeToDelete,
  deleteRouteLoading,
  setIsEditing,
}: Props) => {
  return (
    <Transition appear show={isDeleteRouteOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsDeleteRouteOpen(false)}
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
                {deleteRouteLoading ? (
                  <div className="h-64 flex flex-col items-center justify-center space-y-2">
                    <CircleNotch
                      size={80}
                      className="animate-spin text-ch-dark dark:text-ch-light"
                    />
                    <span className="text-lg text-ch-dark dark:text-ch-light">
                      Deleting route...
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                      >
                        Delete Route
                      </Dialog.Title>
                    </div>
                    <div className="mt-2 text-ch-dark dark:text-ch-light">
                      <p>Are you sure you want to delete this route?</p>
                    </div>
                    <div className="flex items-center justify-between mt-10">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setIsEditing(false);
                          setIsDeleteRouteOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => deleteARoute(routeToDelete)}>
                        Delete
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
