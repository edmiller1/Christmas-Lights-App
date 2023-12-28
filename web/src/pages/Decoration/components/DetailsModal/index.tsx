import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CircleNotch, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { CancelModal } from "@/components";
import { EditDecorationForm } from "..";
import { Get_Decoration } from "@/graphql/queries/getDecoration/types";

interface Props {
  isEditOpen: boolean;
  setIsEditOpen: (isEditOpen: boolean) => void;
  setIsCancelOpen: (iscancelOpen: boolean) => void;
  isCancelOpen: boolean;
  discardEdits: () => void;
  setCurrentStep: (currentStep: number) => void;
  deletedImages: { id: string; url: string }[];
  decoration: Get_Decoration | null;
  updateDecoration: (
    id: string,
    address: string,
    city: string,
    country: string,
    deletedImages: { id: string; url: string }[],
    latitude: number,
    longitude: number,
    name: string,
    newImages: string[],
    region: string
  ) => void;
  editDecorationLoading: boolean;
  files: File[] | number[];
  countryAbbrev: string;
}

export const DetailsModal = ({
  isEditOpen,
  setIsCancelOpen,
  isCancelOpen,
  discardEdits,
  setCurrentStep,
  deletedImages,
  decoration,
  updateDecoration,
  editDecorationLoading,
  files,
  countryAbbrev,
}: Props) => {
  return (
    <Transition appear show={isEditOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsCancelOpen(true)}
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
                <div className="flex items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                  >
                    Edit Decoration
                  </Dialog.Title>
                  {editDecorationLoading ? null : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsCancelOpen(true)}
                    >
                      <X size={16} color="#ffffff" weight="bold" />
                    </Button>
                  )}
                </div>
                {editDecorationLoading ? null : (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Update your decoration name and address.
                    </p>
                  </div>
                )}

                <div>
                  {editDecorationLoading ? (
                    <div className="flex flex-col items-center">
                      <CircleNotch
                        size={80}
                        className="animate-spin text-ch-dark dark:text-ch-light"
                      />
                      <p className="mt-2 dark:text-white">
                        Updating Decoration...
                      </p>
                    </div>
                  ) : (
                    <EditDecorationForm
                      setCurrentStep={setCurrentStep}
                      deletedImages={deletedImages}
                      decoration={decoration}
                      updateDecoration={updateDecoration}
                      files={files}
                      countryAbbrev={countryAbbrev}
                    />
                  )}
                </div>

                <CancelModal
                  title="Discard edits?"
                  body="If you leave, your edits won;t be saved."
                  cancelText="Cancel"
                  discardFunction={discardEdits}
                  isCancelOpen={isCancelOpen}
                  setIsCancelOpen={setIsCancelOpen}
                  confirmText="Discard"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
