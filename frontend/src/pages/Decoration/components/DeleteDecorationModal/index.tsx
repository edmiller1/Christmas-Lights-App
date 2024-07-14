import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { CircleNotch } from "@phosphor-icons/react";

interface Props {
  deleteDecorationLoading: boolean;
  deleteUserDecoration: (decorationId: string) => void;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (isDeleteOpen: boolean) => void;
  decorationId: string;
}

export const DeleteDecorationModal = ({
  deleteDecorationLoading,
  deleteUserDecoration,
  isDeleteOpen,
  setIsDeleteOpen,
  decorationId,
}: Props) => {
  return (
    <Dialog
      as="div"
      open={isDeleteOpen}
      onClose={() => setIsDeleteOpen(false)}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="w-full h-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-background">
            {deleteDecorationLoading ? (
              <div className="flex flex-col justify-center items-center h-full space-y-5">
                <CircleNotch size={80} weight="bold" className="animate-spin" />
                <span>
                  Deleting Decoration. Please do not close this modal.
                </span>
              </div>
            ) : (
              <>
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Delete Decoration?
                </DialogTitle>
                <div className="my-2">
                  <p className="text-sm text-gray-500">
                    Deleting a decoration will also delete the views, ratings
                    and images associated with the decoration
                  </p>
                </div>
                <div className="my-2">
                  <p className="text-sm text-gray-500">
                    This action is permanent and cannot be undone
                  </p>
                </div>
                <div className="mt-8 flex items-center space-x-4">
                  <Button onClick={() => deleteUserDecoration(decorationId)}>
                    Delete
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setIsDeleteOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
