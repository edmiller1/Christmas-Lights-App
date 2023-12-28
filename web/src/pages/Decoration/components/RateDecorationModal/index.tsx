import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Star, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AddRatingModal, EditRatingModal } from "..";

interface Props {
  isRatingModalOpen: boolean;
  setIsRatingModalOpen: (isRatingModalOpen: boolean) => void;
  rating: number | undefined;
  decorationId: string | undefined;
  ratings:
    | {
        id: string;
        rating: number;
        user_id: string;
        decoration_id: string;
      }[]
    | undefined;
  numRatings: number | undefined;
  userId: string | undefined;
  decorationUserId: string | undefined;
  isAddRatingOpen: boolean;
  setIsAddRatingOpen: (isAddRatingOpen: boolean) => void;
  addRating: (rating: number) => void;
  rateDecorationLoading: boolean;
  isEditRatingOpen: boolean;
  setIsEditRatingOpen: (isEditRatingOpen: boolean) => void;
  editRatingLoading: boolean;
  initialRating: number | undefined;
  setInitialRating: (initialRating: number | undefined) => void;
  updateRating: (rating: number | undefined) => void;
}

type Counts = {
  [key: number]: number;
};

export const RateDecorationModal = ({
  isRatingModalOpen,
  setIsRatingModalOpen,
  rating,
  ratings,
  numRatings,
  userId,
  decorationUserId,
  isAddRatingOpen,
  setIsAddRatingOpen,
  addRating,
  rateDecorationLoading,
  isEditRatingOpen,
  setIsEditRatingOpen,
  editRatingLoading,
  initialRating,
  setInitialRating,
  updateRating,
}: Props) => {
  const ratingLength = numRatings ?? 0;
  const counts: Counts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  ratings?.forEach((item) => {
    counts[item.rating]++;
  });

  const bars = [];
  for (let i = 5; i >= 1; i--) {
    bars.push(
      <div className="flex items-center space-x-5 mb-3" key={i}>
        <span className="text-sm font-medium">{i}</span>
        <Progress value={(counts[i] / ratingLength) * 100} className="w-full" />
        {/* <span className="text-sm font-medium">
          {counts[i] === 0 ? 0 : ((counts[i] / ratingLength) * 100).toFixed(0)}%
        </span> */}
      </div>
    );
  }

  return (
    <Transition appear show={isRatingModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsRatingModalOpen(false)}
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
                    Ratings
                  </Dialog.Title>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsRatingModalOpen(false)}
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
                    Create/edit or view ratings for this decoration
                  </p>
                </div>
                <div className="px-5 py-5 flex items-center space-x-3 text-ch-dark dark:text-ch-light">
                  <Star size={28} weight="fill" className="text-ch-yellow" />
                  <h1 className="text-2xl font-bold">{rating?.toFixed(1)}</h1>
                </div>
                <div className="px-5 w-3/4 text-ch-dark dark:text-ch-light">
                  <span>Overall rating</span>
                  <div className="mt-2">{bars}</div>
                </div>
                {userId === decorationUserId ? null : (
                  <>
                    {ratings?.some((rating) => rating.user_id === userId) ? (
                      <div className="flex justify-center mt-20">
                        <Button
                          variant="secondary"
                          className="text-lg font-semibold"
                          onClick={() => setIsEditRatingOpen(true)}
                        >
                          Edit rating
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-center mt-20">
                        <Button
                          variant="secondary"
                          className="text-lg font-semibold"
                          onClick={() => setIsAddRatingOpen(true)}
                        >
                          Rate decoration
                        </Button>
                      </div>
                    )}
                  </>
                )}
                <AddRatingModal
                  isAddRatingOpen={isAddRatingOpen}
                  setIsAddRatingOpen={setIsAddRatingOpen}
                  addRating={addRating}
                  rateDecorationLoading={rateDecorationLoading}
                />
                <EditRatingModal
                  editRatingLoading={editRatingLoading}
                  initialRating={initialRating}
                  setInitialRating={setInitialRating}
                  isEditRatingOpen={isEditRatingOpen}
                  setIsEditRatingOpen={setIsEditRatingOpen}
                  updateRating={updateRating}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
