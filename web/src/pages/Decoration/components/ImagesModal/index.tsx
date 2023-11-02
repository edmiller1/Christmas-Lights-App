import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CaretLeft, CaretRight, ImagesSquare, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { RemoveImageModal } from "../../../../components/AppHeader/components/RemoveImageModal";
import { CancelModal } from "@/components";

interface Props {
  isEditOpen: boolean;
  setIsEditOpen: (isEditOpen: boolean) => void;
  currentImage: { id: string; url: string } | undefined;
  setCurrentStep: (currentStep: number) => void;
  images: { id: string; url: string }[] | undefined;
  nextImage: () => void;
  prevImage: () => void;
  removeImage: (id: string | undefined) => void;
  isRemoveImageOpen: boolean;
  setIsRemoveImageOpen: (isRemoveImageOpen: boolean) => void;
  userPremium: boolean | undefined;
  isCancelOpen: boolean;
  setIsCancelOpen: (isCancelOpen: boolean) => void;
  discardEdits: () => void;
  handleImageSelect: (e: any) => void;
}

export const ImagesModal = ({
  isEditOpen,
  setIsEditOpen,
  currentImage,
  setCurrentStep,
  images,
  nextImage,
  prevImage,
  removeImage,
  isRemoveImageOpen,
  setIsRemoveImageOpen,
  userPremium,
  isCancelOpen,
  setIsCancelOpen,
  discardEdits,
  handleImageSelect,
}: Props) => {
  return (
    <>
      <Transition appear show={isEditOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsEditOpen(false)}
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
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Update your decoration
                    </p>
                  </div>
                  {images?.length === 0 ? (
                    <div className="mt-3 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-500">
                      <ImagesSquare size={120} color="#ffffff" weight="thin" />
                      <label className="bg-ch-red mb-3 w-2/3 text-sm text-center cursor-pointer rounded-lg px-4 py-2 text-white hover:opacity-90 sm:w-1/2 sm:text-base">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageSelect(e)}
                        />
                        Select from computer
                      </label>
                      <span className="mb-3 text-sm text-gray-500">
                        {userPremium
                          ? "Images up to 6MB, Max 8"
                          : "Images up to 4MB, Max 6"}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="relative mt-2">
                        {images && images.length > 1 ? (
                          <button
                            className="animate-fade-in absolute right-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60 sm:hidden"
                            onClick={nextImage}
                          >
                            <CaretRight size={20} color="#FFFFFF" />
                          </button>
                        ) : null}
                        {images && images.length > 1 ? (
                          <button
                            className="animate-fade-in absolute left-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60 sm:hidden"
                            onClick={prevImage}
                          >
                            <CaretLeft size={20} color="#FFFFFF" />
                          </button>
                        ) : null}

                        {images && images.length >= 2 ? (
                          <>
                            <button
                              className="animate-fade-in absolute right-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60"
                              onClick={nextImage}
                            >
                              <CaretRight size={20} color="#FFFFFF" />
                            </button>
                            <button
                              className="animate-fade-in absolute left-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60"
                              onClick={prevImage}
                            >
                              <CaretLeft size={20} color="#FFFFFF" />
                            </button>
                          </>
                        ) : null}

                        <button
                          className="animate-fade-in absolute right-2 top-2 z-50 rounded-full bg-black px-2 py-2 opacity-80 hover:opacity-60"
                          onClick={() => setIsRemoveImageOpen(true)}
                        >
                          <X size={12} color="#ffffff" weight="bold" />
                        </button>

                        <div className="absolute bottom-5 left-1/4 sm:left-[28%]">
                          <label className="bg-ch-red mb-3 w-2/3 text-sm text-center cursor-pointer rounded-lg px-4 py-2 text-white hover:opacity-90 sm:w-1/2 sm:text-base">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) => handleImageSelect(e)}
                            />
                            Select more images
                          </label>
                        </div>

                        <img
                          loading="lazy"
                          src={currentImage?.url}
                          alt="Decoration image"
                          className="w-[400px] h-[400px] rounded-lg object-cover bg-ch-turquoise"
                        />
                      </div>
                      <div className="mt-5">
                        <Button
                          variant="outline"
                          className="flex float-right"
                          onClick={() => setCurrentStep(2)}
                        >
                          Continue
                        </Button>
                      </div>
                    </>
                  )}

                  <RemoveImageModal
                    body="Are you sure you want to delete this image?"
                    isRemoveImageOpen={isRemoveImageOpen}
                    removeImage={removeImage}
                    setIsRemoveImageOpen={setIsRemoveImageOpen}
                    title="Delete Image"
                    currentImage={currentImage}
                  />
                  <CancelModal
                    title="Discard edits?"
                    body="If you leave, your edits won't be saved."
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
    </>
  );
};
