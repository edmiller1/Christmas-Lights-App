import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { CircleNotch } from "@phosphor-icons/react";

interface Props {
  isDeleteOpen: boolean;
  setIsDeleteOpen: (isDeleteOpen: boolean) => void;
  deleteUserAccount: () => void;
  deleteAccountLoading: boolean;
}

export const DeleteAccountModal = ({
  isDeleteOpen,
  setIsDeleteOpen,
  deleteUserAccount,
  deleteAccountLoading,
}: Props) => {
  return (
    <Transition.Root appear show={isDeleteOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
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
              <Dialog.Panel className="w-full max-w-md h-56 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all bg-background dark:bg-zinc-900">
                {deleteAccountLoading ? (
                  <div className="flex flex-col justify-center items-center h-full space-y-5">
                    <CircleNotch
                      size={80}
                      weight="bold"
                      className="animate-spin"
                    />
                    <span>
                      Deleting Account. Please do not close this modal.
                    </span>
                  </div>
                ) : (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                    >
                      Delete Account?
                    </Dialog.Title>
                    <div className="my-2">
                      <p className="text-sm text-gray-500">
                        Deleting your account will also delete the history,
                        favourites, ratings, images and decorations associated
                        with the account.
                      </p>
                    </div>
                    <div className="my-2">
                      <p className="text-sm text-gray-500">
                        This action is permanent and cannot be undone
                      </p>
                    </div>
                    <div className="mt-8 flex items-center space-x-4">
                      <Button onClick={deleteUserAccount}>Delete</Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsDeleteOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
