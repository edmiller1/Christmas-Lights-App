import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Star, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { CancelModal } from "@/components";

interface Props {
  isAddRatingOpen: boolean;
  setIsAddRatingOpen: (isAddRatingOpen: boolean) => void;
}

export const AddRatingModal = ({
  isAddRatingOpen,
  setIsAddRatingOpen,
}: Props) => {
  const [rating, setRating] = useState<number>(0);
  const [cancelRatingModalOpen, setCancelRatingModalOpen] =
    useState<boolean>(false);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const discardRating = () => {
    setRating(0);
    setCancelRatingModalOpen(false);
    setIsAddRatingOpen(false);
  };

  return (
    <Transition appear show={isAddRatingOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsAddRatingOpen(false)}
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
                    Rate Decoration
                  </Dialog.Title>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsAddRatingOpen(false)}
                  >
                    <X
                      size={16}
                      weight="bold"
                      className="text-ch-dark dark:text-ch-light"
                      onClick={() => setCancelRatingModalOpen(true)}
                    />
                  </Button>
                </div>
                <div className="flex justify-center mt-3 p-4">
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={ratingValue}>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => handleRating(ratingValue)}
                          hidden
                        />
                        {ratingValue <= rating ? (
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
                  })}
                </div>
                <div className="pt-2 pb-4 px-10 text-sm text-center text-ch-indigo dark:text-ch-light">
                  <span>
                    Click on the stars above to rate the decoration. The more
                    stars the greater you think the decoration looks. Ratings on
                    a decoration can be updated at anytime.
                  </span>
                </div>
                <div className="flex justify-center py-4">
                  <Button variant="secondary" className="text-lg font-semibold">
                    Save
                  </Button>
                </div>
                <CancelModal
                  body="Your rating won't be saved"
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
