import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CircleNotch, Star, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { CancelModal } from "@/components";

interface Props {
  isEditRatingOpen: boolean;
  setIsEditRatingOpen: (isEditRatingOpen: boolean) => void;
  editRatingLoading: boolean;
  initialRating: number | undefined;
  setInitialRating: (initialRating: number | undefined) => void;
  updateRating: (rating: number | undefined) => void;
}

export const EditRatingModal = ({
  isEditRatingOpen,
  setIsEditRatingOpen,
  editRatingLoading,
  initialRating,
  setInitialRating,
  updateRating,
}: Props) => {
  const [rating, setRating] = useState<number | undefined>(initialRating);
  const [cancelRatingModalOpen, setCancelRatingModalOpen] =
    useState<boolean>(false);

  const handleRating = (value: number) => {
    setRating(value);
    setInitialRating(value);
  };

  const discardRating = () => {
    setRating(initialRating);
    setCancelRatingModalOpen(false);
    setIsEditRatingOpen(false);
  };

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  return (
    <Transition appear show={isEditRatingOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setCancelRatingModalOpen(true)}
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
                    onClick={() => setCancelRatingModalOpen(true)}
                  >
                    <X
                      size={16}
                      weight="bold"
                      className="text-ch-dark dark:text-ch-light"
                    />
                  </Button>
                </div>
                {editRatingLoading ? (
                  <div className="flex flex-col justify-start items-center mt-3 p-4 text-ch-dark dark:text-ch-light">
                    <CircleNotch
                      size={54}
                      weight="bold"
                      className="animate-spin text-ch-dark dark:text-ch-light"
                    />
                    <span className="text-lg">Updating rating...</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center mt-3 p-4">
                      {[...Array(5)].map(
                        //@ts-ignore
                        (star, index) => {
                          const ratingValue = index + 1;
                          return (
                            <label key={ratingValue}>
                              <input
                                type="radio"
                                name="rating"
                                value={rating}
                                onClick={() => handleRating(ratingValue)}
                                checked={ratingValue === rating}
                                readOnly
                                hidden
                              />
                              {rating && ratingValue <= rating ? (
                                <Star
                                  size={54}
                                  color="#E8A951"
                                  weight="fill"
                                  className="cursor-pointer"
                                />
                              ) : (
                                <Star
                                  size={54}
                                  className="cursor-pointer text-ch-dark dark:text-ch-light"
                                />
                              )}
                            </label>
                          );
                        }
                      )}
                    </div>
                    <div className="flex justify-center py-4">
                      <Button
                        variant="secondary"
                        className="text-lg font-semibold"
                        disabled={rating === 0}
                        onClick={() => updateRating(rating)}
                      >
                        Save
                      </Button>
                    </div>
                  </>
                )}
                <CancelModal
                  body="Your updated rating won't be saved"
                  cancelText="Cancel"
                  confirmText="Discard"
                  isCancelOpen={cancelRatingModalOpen}
                  setIsCancelOpen={setCancelRatingModalOpen}
                  discardFunction={discardRating}
                  title="Discard Rating"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
