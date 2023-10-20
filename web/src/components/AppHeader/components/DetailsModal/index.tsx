import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CircleNotch, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { CancelModal } from "@/components";
import { CreateDecorationForm } from "..";

interface Props {
  isCreateOpen: boolean;
  isCancelOpen: boolean;
  setIsCancelOpen: (cancelOpen: boolean) => void;
  discardDecoration: () => void;
  setCurrentStep: (currentStep: number) => void;
  images: Array<{ id: string; url: string }>;
  files: File[];
  createNewDecoration: (
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    country: string,
    region: string,
    city: string,
    images: string[]
  ) => void;
  createDecorationLoading: boolean;
}

export const DetailsModal = ({
  isCreateOpen,
  isCancelOpen,
  setIsCancelOpen,
  discardDecoration,
  setCurrentStep,
  files,
  createNewDecoration,
  createDecorationLoading,
}: Props) => {
  return (
    <Transition appear show={isCreateOpen} as={Fragment}>
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
                    Decoration Details
                  </Dialog.Title>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCancelOpen(true)}
                  >
                    <X size={16} color="#ffffff" weight="bold" />
                  </Button>
                </div>
                <div>
                  {createDecorationLoading ? (
                    <div className="flex flex-col items-center justify-center py-5">
                      <CircleNotch
                        size={80}
                        color="#ffffff"
                        className="animate-spin"
                      />
                      <p className="mt-2 dark:text-white">
                        Creating Decoration...
                      </p>
                    </div>
                  ) : (
                    <CreateDecorationForm
                      setCurrentStep={setCurrentStep}
                      files={files}
                      createNewDecoration={createNewDecoration}
                    />
                  )}
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
    </Transition>
  );
};
