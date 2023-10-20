import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircle, ImagesSquare, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { CancelModal } from "@/components";
import { Get_User } from "@/graphql/queries/getUser/types";

interface Props {
  isCreateOpen: boolean;
  setIsCreateOpen: (isOpen: boolean) => void;
  isCancelOpen: boolean;
  setIsCancelOpen: (isCancelOpen: boolean) => void;
  setCurrentStep: (currentStep: number) => void;
  discardDecoration: () => void;
  closeUploadModal: () => void;
  images: Array<{ id: string; url: string }>;
  user: Get_User | null;
  handleImageSelect: (e: any) => void;
  handleDrop: (e: any) => void;
  handleDragOver: (e: any) => void;
}

export const UploadModal = ({
  isCreateOpen,
  isCancelOpen,
  setIsCancelOpen,
  setCurrentStep,
  discardDecoration,
  closeUploadModal,
  images,
  user,
  handleDragOver,
  handleDrop,
  handleImageSelect,
}: Props) => {
  return (
    <Transition.Root appear show={isCreateOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeUploadModal}>
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
                <div className="flex items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                  >
                    Create New Decoration
                  </Dialog.Title>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeUploadModal}
                  >
                    <X size={16} color="#ffffff" weight="bold" />
                  </Button>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Get started in creating your new decoration.
                  </p>
                </div>

                {images.length === 0 ? (
                  <div
                    className="mt-3 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-500"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <ImagesSquare size={120} color="#ffffff" weight="thin" />
                    <p className="hidden sm:block sm:mb-5 sm:mt-1 sm:font-normal dark:text-gray-100">
                      Drag photos here
                    </p>
                    <label className="bg-ch-red mb-3 w-2/3 text-sm text-center cursor-pointer rounded-lg px-4 py-2 text-white hover:opacity-90 sm:w-1/2 sm:text-base">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageSelect}
                      />
                      Select from computer
                    </label>
                    <span className="mb-3 text-sm text-gray-500">
                      {user?.premium
                        ? "Images up to 6MB, Max 8"
                        : "Images up to 4MB, Max 6"}
                    </span>
                  </div>
                ) : (
                  <div
                    className="mt-3 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-500 py-8"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <CheckCircle size={120} color="#ffffff" weight="thin" />
                    {images.length === 1 ? (
                      <p className="text-base dark:text-gray-100">
                        {images?.length} Image uploaded Successfully 🎉
                      </p>
                    ) : (
                      <p className="text-base dark:text-gray-100">
                        {images?.length} Images uploaded Successfully 🎉
                      </p>
                    )}
                    <label className="bg-ch-red mt-5 w-2/3 text-sm cursor-pointer rounded-lg px-4 py-2 text-center text-white hover:opacity-90 sm:w-1/2 sm:text-base">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageSelect}
                      />
                      Select more images
                    </label>
                  </div>
                )}
                <div className="float-right mt-4">
                  <Button
                    className="disabled:cursor-not-allowed"
                    disabled={images?.length === 0}
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue
                  </Button>
                </div>
                <CancelModal
                  title="Discard decoration?"
                  body="If you leave, your edits won't be saved."
                  cancelText="Cancel"
                  confirmText="Discard"
                  discardFunction={discardDecoration}
                  isCancelOpen={isCancelOpen}
                  setIsCancelOpen={setIsCancelOpen}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
