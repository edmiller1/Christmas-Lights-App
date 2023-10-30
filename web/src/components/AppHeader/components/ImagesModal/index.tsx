import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CancelModal } from "@/components";
import { RemoveImageModal } from "..";

interface Props {
  isCreateOpen: boolean;
  isCancelOpen: boolean;
  setIsCancelOpen: (isCancelOpen: boolean) => void;
  setCurrentStep: (currentStep: number) => void;
  images: Array<{ id: string; url: string }>;
  currentImage: { id: string; url: string } | undefined;
  discardDecoration: () => void;
  removeImage: (id: string | undefined) => void;
  nextImage: () => void;
  prevImage: () => void;
  showImageTools: () => void;
  hideImageTools: () => void;
  showArrows: boolean;
  showRemove: boolean;
  isRemoveImageOpen: boolean;
  setIsRemoveImageOpen: (isRemoveImageOpen: boolean) => void;
}

export const ImagesModal = ({
  isCreateOpen,
  isCancelOpen,
  setIsCancelOpen,
  setCurrentStep,
  images,
  currentImage,
  discardDecoration,
  removeImage,
  nextImage,
  prevImage,
  showImageTools,
  hideImageTools,
  showArrows,
  showRemove,
  isRemoveImageOpen,
  setIsRemoveImageOpen,
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
                    Images
                  </Dialog.Title>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCancelOpen(true)}
                  >
                    <X
                      size={16}
                      weight="bold"
                      className="text-ch-dark dark:text-ch-light"
                    />
                  </Button>
                </div>
                <div
                  className="relative mt-2"
                  onMouseEnter={showImageTools}
                  onMouseLeave={hideImageTools}
                >
                  {images.length > 1 ? (
                    <div
                      className="animate-fade-in absolute right-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60 sm:hidden"
                      onClick={nextImage}
                    >
                      <CaretRight size={20} color="#FFFFFF" />
                    </div>
                  ) : null}
                  {images.length > 1 ? (
                    <div
                      role="button"
                      className="animate-fade-in absolute left-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60 sm:hidden"
                      onClick={prevImage}
                    >
                      <CaretLeft size={20} color="#FFFFFF" />
                    </div>
                  ) : null}

                  {images.length >= 2 && showArrows ? (
                    <>
                      <div
                        className="animate-fade-in absolute right-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60"
                        onClick={nextImage}
                      >
                        <CaretRight size={20} color="#FFFFFF" />
                      </div>
                      <div
                        role="button"
                        className="animate-fade-in absolute left-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60"
                        onClick={prevImage}
                      >
                        <CaretLeft size={20} color="#FFFFFF" />
                      </div>
                    </>
                  ) : null}
                  <div
                    role="button"
                    className="animate-fade-in absolute right-2 top-2 z-50 rounded-full bg-black px-2 py-2 opacity-80 hover:opacity-60 sm:hidden"
                    onClick={() => setIsRemoveImageOpen(true)}
                  >
                    <X size={12} color="#ffffff" weight="bold" />
                  </div>
                  {showRemove ? (
                    <div
                      role="button"
                      className="animate-fade-in absolute right-2 top-2 z-50 rounded-full bg-black px-2 py-0.5 opacity-80 hover:opacity-60"
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            onClick={() => setIsRemoveImageOpen(true)}
                          >
                            <X size={12} color="#ffffff" weight="bold" />
                          </TooltipTrigger>
                          <TooltipContent className="z-50 mb-2 mr-10">
                            <p>Remove image</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : null}

                  <img
                    loading="lazy"
                    src={currentImage?.url}
                    alt="Decoration image"
                    className="w-[400px] h-[400px] rounded-lg object-cover bg-ch-turquoise"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button variant="default" onClick={() => setCurrentStep(3)}>
                    Continue
                  </Button>
                </div>

                <CancelModal
                  title="Discard decoration"
                  body="If you leave, your edits won't be saved."
                  cancelText="Cancel"
                  confirmText="Discard"
                  discardFunction={discardDecoration}
                  isCancelOpen={isCancelOpen}
                  setIsCancelOpen={setIsCancelOpen}
                />
                <RemoveImageModal
                  body="Are you sure you want to delete this image?"
                  isRemoveImageOpen={isRemoveImageOpen}
                  removeImage={removeImage}
                  setIsRemoveImageOpen={setIsRemoveImageOpen}
                  title="Delete Image"
                  currentImage={currentImage}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
