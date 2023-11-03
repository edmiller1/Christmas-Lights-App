import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Star, X } from "@phosphor-icons/react";
import { motion, Variants } from "framer-motion";
import { AddRatingModal } from "..";

interface Props {
  setShowRatings: (showRatings: boolean) => void;
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
}

type Counts = {
  [key: number]: number;
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const DecorationRatings = ({
  setShowRatings,
  rating,
  decorationId,
  ratings,
  numRatings,
  userId,
  decorationUserId,
  isAddRatingOpen,
  setIsAddRatingOpen,
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
    <>
      <motion.div
        className="overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        onClick={() => setShowRatings(false)}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[75%] w-full z-50 rounded-tl-2xl rounded-tr-2xl dark:bg-[#202023]"
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
      >
        <div className="py-2 px-1">
          <Button variant="ghost" onClick={() => setShowRatings(false)}>
            <X size={16} color="#ffffff" weight="bold" />
          </Button>
        </div>
        <Separator />
        <div className="px-5 py-5 flex items-center space-x-3">
          <Star size={28} weight="fill" className="text-ch-yellow" />
          <h1 className="text-2xl font-bold">{rating?.toFixed(1)}</h1>
        </div>
        <div className="px-5 w-3/4">
          <span>Overall rating</span>
          <div className="mt-2">{bars}</div>
        </div>
        {userId === decorationUserId ? null : (
          <>
            {ratings?.some((rating) => rating.user_id === userId) ? (
              <div className="flex justify-center mt-20">
                <Button variant="secondary" className="text-lg font-semibold">
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
      </motion.div>
      <AddRatingModal
        isAddRatingOpen={isAddRatingOpen}
        setIsAddRatingOpen={setIsAddRatingOpen}
      />
    </>
  );
};
