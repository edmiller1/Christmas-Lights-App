import { Button } from "@/components/ui/button";
import { Get_User } from "@/graphql/queries/getUser/types";
import { ShootingStar } from "@phosphor-icons/react";
import { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

interface Props {
  currentUser: User | null;
  user: Get_User | null;
  decorationId: string | undefined;
  setIsRatingModalOpen: (isRatingModalOpen: boolean) => void;
}

export const RateButton = ({
  user,
  decorationId,
  currentUser,
  setIsRatingModalOpen,
}: Props) => {
  return (
    <>
      {currentUser ? (
        <>
          {user?.ratings.some(
            (rating) => rating.decoration_id === decorationId
          ) ? (
            <Button variant="ghost" onClick={() => setIsRatingModalOpen(true)}>
              <ShootingStar
                size={20}
                weight="fill"
                className="text-ch-yellow"
              />
              <span className="ml-2">Rate</span>
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setIsRatingModalOpen(true)}>
              <ShootingStar
                size={20}
                className="text-ch-dark dark:text-ch-light"
              />
              <span className="ml-2">Rate</span>
            </Button>
          )}
        </>
      ) : (
        <Link to="/signin">
          <Button variant="ghost">
            <ShootingStar
              size={20}
              className="text-ch-dark dark:text-ch-light"
            />
            <span className="ml-2">Rate</span>
          </Button>
        </Link>
      )}
    </>
  );
};
